import { Processor, Process } from 'nestjs-pgmq';
import { config } from '../config';
import type { PgmqJob } from 'nestjs-pgmq';
import { RendersService } from './renders.service';

@Processor(config.queue.file)
export class FileProcessor {
  @Process('file')
  async handleFile(job: PgmqJob<{ renderId: string }>) {
    console.log('new file', job);
  }
}
