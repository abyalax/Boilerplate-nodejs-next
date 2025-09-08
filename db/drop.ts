import { sql } from 'drizzle-orm';
import { db } from '.';

async function dropAllTables() {
  try {
    console.log('🗑️  Starting complete database cleanup...');

    // Get all tables from current database
    const [rows] = await db.execute(sql`
      SELECT table_name as tableName
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'
    `);

    const tables = rows as unknown as Array<{ tableName: string }>;

    console.log(`📋 Found ${tables.length} tables to drop`);

    if (tables.length === 0) {
      console.log('ℹ️  No tables found to drop');
      return;
    }

    // Disable foreign key checks to avoid constraint errors
    console.log('🔓 Disabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);

    for (const table of tables) {
      const tableName = table.tableName;
      console.log(`💥 Dropping table: ${tableName}`);

      try {
        await db.execute(sql.raw(`DROP TABLE IF EXISTS \`${tableName}\``));
        console.log(`  ✅ ${tableName} dropped successfully`);
      } catch (error) {
        console.error(`  ❌ Failed to drop ${tableName}:`, error);
      }
    }

    // Re-enable foreign key checks
    console.log('🔒 Re-enabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log('🎉 All tables dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);

    // Try to re-enable foreign key checks even if something failed
    try {
      await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
    } catch (fkError) {
      console.error('Failed to re-enable foreign key checks:', fkError);
    }
    throw error;
  }
}

async function dropSpecificTables(tableNames: string[]) {
  try {
    console.log('🗑️  Starting specific table drop...');
    console.log(`📋 Tables to drop: ${tableNames.join(', ')}`);

    // Check if tables exist first
    const [existingRows] = await db.execute(sql`
      SELECT table_name as tableName
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND table_type = 'BASE TABLE'
    `);

    const existingTables = (existingRows as unknown as Array<{ tableName: string }>).map((t) => t.tableName);

    const validTables = tableNames.filter((name) => existingTables.includes(name));
    const invalidTables = tableNames.filter((name) => !existingTables.includes(name));

    if (invalidTables.length > 0) {
      console.warn(`⚠️  Tables not found: ${invalidTables.join(', ')}`);
    }

    if (validTables.length === 0) {
      console.log('ℹ️  No valid tables to drop');
      return;
    }

    // Disable foreign key checks
    console.log('🔓 Disabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0`);

    for (const tableName of validTables) {
      console.log(`💥 Dropping table: ${tableName}`);

      try {
        await db.execute(sql.raw(`DROP TABLE IF EXISTS \`${tableName}\``));
        console.log(`  ✅ ${tableName} dropped successfully`);
      } catch (error) {
        console.error(`  ❌ Failed to drop ${tableName}:`, error);
      }
    }

    // Re-enable foreign key checks
    console.log('🔒 Re-enabling foreign key checks...');
    await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);

    console.log('🎉 Specific tables dropped successfully');
  } catch (error) {
    console.error('❌ Error dropping specific tables:', error);

    try {
      await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1`);
    } catch (fkError) {
      console.error('Failed to re-enable foreign key checks:', fkError);
    }

    throw error;
  }
}

// Show help information
function showHelp() {
  console.log(`
🔧 Drop Tables Script Usage:

📖 Commands:
  pnpm tsx drop.ts              - Drop ALL tables (⚠️  DESTRUCTIVE!)
  pnpm tsx drop.ts users roles  - Drop specific tables
  pnpm tsx drop.ts --help       - Show this help

⚠️  WARNING: This operation is IRREVERSIBLE!
💡 TIP: Use truncate.ts if you only want to clear data

🎯 Examples:
  pnpm tsx drop.ts users permissions role_permissions
  pnpm tsx drop.ts users user_roles
`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  // Show help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  // Confirmation prompt for dropping all tables
  if (args.length === 0) {
    console.log('⚠️  WARNING: You are about to DROP ALL TABLES!');
    console.log('💡 This action is IRREVERSIBLE and will destroy all data and structure.');
    console.log('🛑 Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

    // 5 second delay for safety
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await dropAllTables();
  } else {
    // Drop specific tables
    await dropSpecificTables(args);
  }
}

main()
  .then(() => {
    console.log('✨ Drop operation completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Drop operation failed:', err);
    process.exit(1);
  });
