import fs from 'fs';
import http from 'http';
import { EncoderProject } from 'src/types';
import { documentDir, getFileId } from './util';
const downloadFile = async ({ filePath, dirPath, url }) =>
  new Promise((res) => {
    fs.mkdirSync(dirPath, { recursive: true });
    const file = fs.createWriteStream(filePath);
    const request = http.get(url, function (response) {
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
  if (exists) return filePath;

  await downloadFile({ filePath, dirPath, url: media.uri || media.url });

  return filePath;
};
