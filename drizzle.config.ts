import { defineConfig } from 'drizzle-kit';
import { env } from './common/const/credential';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
  },
});
