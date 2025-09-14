import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '~/common/const/credential';
import * as schema from './schema';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
