import { Processor, Process } from 'nestjs-pgmq';
import { config } from '../config';
import type { PgmqJob } from 'nestjs-pgmq';
import { Media, MinimalMedia } from '../types';
import { RendersService } from './renders.service';
import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'node:fs';
import { getFileId } from '../ffmpeg/util/util';

@Processor(config.queue.file)
export class FileProcessor {
  s3client: S3Client;
  constructor(private readonly renderService: RendersService) {
    this.s3client = new S3Client({
      ...config.s3,
      forcePathStyle: true,
    });
  }
  @Process('file')
  async handleFile(job: PgmqJob<{ renderId: string; media: MinimalMedia }>) {
    console.log('new file', job);
    const { media, renderId } = job.message.data;
    try {
      if (media?.id && this.s3client) {
        // Ensure bucket exists
        try {
          const bucketExistsCmd = new HeadBucketCommand({ Bucket: renderId });
          await this.s3client.send(bucketExistsCmd);
        } catch (error: any) {
          if (error.name === 'NotFound') {
            const createBucketCmd = new CreateBucketCommand({
              Bucket: renderId,
            });
            await this.s3client.send(createBucketCmd);
          } else {
            throw error;
          }
        }

        const fileStream = fs.createReadStream(media.filePath as string);
        const metadata: Record<string, string> = {};
        for (const [key, value] of Object.entries(media)) {
          if (value !== undefined && value !== null) {
            metadata[key] = String(value);
          }
        }
        metadata.name = media.filename;
        const putObjectCmd = new PutObjectCommand({
          Bucket: 'renders',
          Key: `${renderId}/${getFileId(media as Media)}`,
          Body: fileStream,
          ContentType: 'video/mp4',
          Metadata: metadata,
        });
        await this.s3client.send(putObjectCmd);

        // Generate presigned URL for GET
        const getObjectCmd = new GetObjectCommand({
          Bucket: renderId,
          Key: media.id,
        });
        const link = await getSignedUrl(this.s3client, getObjectCmd, {
          expiresIn: 3600 * 24 * 6,
        }); // 6 days

        media.url = link;
        await this.renderService.updateMediaResult(renderId, media);
      }
    } catch (err) {
      console.error('file upload err', err);
    }
  }
}
