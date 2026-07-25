import { ApiKey } from './model/apikey.entity';
import { Render } from './model/render.entity';
export const config = {
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Render, ApiKey],
    synchronize: process.env.DB_MIGRATION_ENABLED === 'true' ? true : false,
  },
  queue: {
    name: process.env.RENDER_QUEUE as string,
    logs: 'render_logs',
    file: 'render_file',
    isRenderRunner: process.env.IS_RENDER_RUNNER === 'true' ? true : false,
    isLogsRunner: process.env.IS_LOGS_RUNNER === 'true' ? true : false,
    isFileRunner: process.env.IS_FILE_RUNNER === 'true' ? true : false,
  },
  ffmpeg: {
    path: process.env.FFMPEG_PATH as string,
  },
  documentDir: process.env.DOCUMENT_DIRECTORY || '/tmp/ffmpeglab',
};
