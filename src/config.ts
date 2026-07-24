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
    isRunner: process.env.IS_QUEUE_RUNNER === 'true' ? true : false,
  },
  ffmpeg: {
    path: process.env.FFMPEG_PATH as string,
  },
  documentDir: process.env.DOCUMENT_DIRECTORY || '/tmp/ffmpeglab',
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT_SECRET_123456789000__qwerty___',
  },
};
