import { spawn } from 'node:child_process';
import { execToMilliseconds } from './genExecTime';
import fs from 'node:fs';
import { config } from '../../config';
import path from 'node:path';

export type CBProgressParams = { progress: number; time: number };
export type CBProgressCallback = (progress: CBProgressParams) => void;
export type LogsProgressCallback = (line: string) => void;

const ffmpegPath = config.ffmpeg.path;

export const createFFmpeg = async (
  cb?: CBProgressCallback,
  logsCB?: LogsProgressCallback,
) => {
  const ffmpeg = {
    exec: async (cmd: string[], env: typeof process.env) => {
      await new Promise((resolve) => {
        console.info('exec native ffmpeg', ffmpegPath, cmd, env);
        env.FFMPEG_PATH = ffmpegPath;
        let ncmd = '';
        if (typeof cmd === 'string') {
          ncmd = cmd;
          Object.keys(env).map((k) => {
            ncmd = ncmd.replace('$' + k, (env as any)[k as any]);
          });
        }
        const cmdProcessed =
          typeof cmd === 'string'
            ? ncmd
            : cmd.map((k) =>
                env[k.replace('$', '')]
                  ? (env[k.replace('$', '')] as string)
                  : k,
              );
        const postmapcmd = cmdProcessed as string[];
        console.info({ postmapcmd });
        const child = spawn(
          path.join(__dirname.replace('/dist', '/src'), '/execffmpeg.sh'),
          postmapcmd,
          { env },
        );
        child.stdout.on('data', (data: Buffer) => {
          console.error('native ffmpeg logs', data.toString('utf-8'));
          logsCB && logsCB(data.toString('utf-8'));
        });
        child.stderr.on('data', (data: Buffer) => {
          const logs = data.toString('utf-8');
          if (logs.search('time=') > -1) {
            const timeUnformatted = logs.split('time=')[1].split(' ')[0];
            const time = execToMilliseconds(timeUnformatted) * 1000000;
            console.info('time logs', logs, time, timeUnformatted);
            cb && cb({ time, progress: 0 });
          }
          logsCB && logsCB(data.toString('utf-8'));
        });
        child.on('close', (code: number) => {
          console.info('child finished', code);
          resolve(code);
        });
      });
    },
    readAsBase64: (filePath: string) =>
      fs.readFileSync(filePath, { encoding: 'base64' }),
    readFile: (fileName: string) => fs.readFileSync(fileName),
    writeFile: (fileName: string, file: File) => {},
  };
  return ffmpeg;
};
