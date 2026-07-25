import fs from 'fs';
import http from 'http';
import https from 'https';
import { EncoderProject } from '../../types';
import { documentDir, getFileId } from './util';
const downloadFile = async ({ filePath, dirPath, url }) =>
  new Promise((res) => {
    try {
      fs.mkdirSync(dirPath, { recursive: true });
    } catch (err) {}
    const file = fs.createWriteStream(filePath);
    const protocoledClient = url.search('https') > -1 ? https : http;
    const request = protocoledClient.get(url, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on('finish', () => {
        file.close();
        console.log('Download Completed');
        res(file);
      });
    });
  });
export const syncMedia = async (media: EncoderProject) => {
  const filename = getFileId(media);
  const dirPath = `${documentDir()}/${media.folderId}`;
  const filePath = `${dirPath}/${filename}`;
  const exists = fs.existsSync(filePath);
  if (exists) fs.unlinkSync(filePath);

  await downloadFile({ filePath, dirPath, url: media.uri || media.url });

  return filePath;
};
