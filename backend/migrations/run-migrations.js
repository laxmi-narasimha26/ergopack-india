const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ergopack_cms',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

async function runMigrations() {
  const client = await pool.connect();

  try {
    console.log('🚀 Running database migrations...\n');

    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get list of migration files
    const migrationsDir = __dirname;
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      // Check if migration already executed
      const result = await client.query(
        'SELECT id FROM migrations WHERE filename = $1',
        [file]
      );

      if (result.rows.length > 0) {
        console.log(`⏭️  Skipping ${file} (already executed)`);
        continue;
      }

      console.log(`📝 Executing ${file}...`);

      // Read and execute migration file
      const filepath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filepath, 'utf8');

      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        );
        await client.query('COMMIT');
        console.log(`✅ Successfully executed ${file}\n`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    console.log('✨ All migrations completed successfully!\n');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
