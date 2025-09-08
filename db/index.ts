import { env } from '~/common/const/credential';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema/index';

const poolConnection = mysql.createPool({
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
