import { reset } from 'drizzle-seed';

import { db } from '.';
import * as schema from './schema';

async function main() {
  console.log('⚡[server]: Delete data...');
  await reset(db, schema);
}

main()
  .then(async () => {
    console.log('✅ Remove data successfully');
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
