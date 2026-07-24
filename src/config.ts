import { Render } from './model/render.entity';
export const config = {
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Render],
    synchronize: process.env.DB_MIGRATION_ENABLED === 'true' ? true : false,
  },
};
