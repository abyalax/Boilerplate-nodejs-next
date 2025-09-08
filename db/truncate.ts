import { sql } from 'drizzle-orm';
import { db } from '.';

async function truncateAllTables() {
  try {
    console.log('🗑️  Starting table truncation...');

    // Get all tables from current database
    const [rows] = await db.execute(sql`
      SELECT table_name as tableName
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'
    `);

    const tables = rows as unknown as Array<{ tableName: string }>;
    console.log(`📋 Found ${tables.length} tables to truncate`);

    if (tables.length === 0) {
      console.log('ℹ️  No tables found to truncate');
      return;
    }

    // Disable foreign key checks temporarily
    console.log('🔓 Disabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);

    // Truncate each table
    for (const table of tables) {
      const tableName = table.tableName;
      console.log(`🧹 Truncating table: ${tableName}`);

      try {
        await db.execute(sql.raw(`TRUNCATE TABLE \`${tableName}\``));
        console.log(`  ✅ ${tableName} truncated successfully`);
      } catch (error) {
        console.error(`  ❌ Failed to truncate ${tableName}:`, error);
      }
    }

    // Re-enable foreign key checks
    console.log('🔒 Re-enabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log('🎉 All tables truncated successfully');
  } catch (error) {
    console.error('❌ Error truncating tables:', error);

    // Try to re-enable foreign key checks even if something failed
    try {
      await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
    } catch (fkError) {
      console.error('Failed to re-enable foreign key checks:', fkError);
    }

    throw error;
  }
}

// Truncate specific tables only
async function truncateSpecificTables(tableNames: string[]) {
  try {
    console.log('🗑️  Starting specific table truncation...');
    console.log(`📋 Tables to truncate: ${tableNames.join(', ')}`);

    // Disable foreign key checks temporarily
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);

    for (const tableName of tableNames) {
      console.log(`🧹 Truncating table: ${tableName}`);

      try {
        await db.execute(sql.raw(`TRUNCATE TABLE \`${tableName}\``));
        console.log(`  ✅ ${tableName} truncated successfully`);
      } catch (error) {
        console.error(`  ❌ Failed to truncate ${tableName}:`, error);
      }
    }

    // Re-enable foreign key checks
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log('🎉 Specific tables truncated successfully');
  } catch (error) {
    console.error('❌ Error truncating specific tables:', error);

    try {
      await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
    } catch (fkError) {
      console.error('Failed to re-enable foreign key checks:', fkError);
    }

    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Truncate specific tables
    await truncateSpecificTables(args);
  } else {
    // Truncate all tables
    await truncateAllTables();
  }
}

/**
 * Usage:
 * pnpm tsx truncate.ts
 *
 * or
 *
 * pnpm tsx truncate.ts table1 table2
 */

main()
  .then(() => {
    console.log('✨ Truncation completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Truncation failed:', err);
    process.exit(1);
  });
