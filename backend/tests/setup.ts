import { pool } from '../src/config/database';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  // Run migrations or setup test database
  console.log('Setting up test database...');
});

// Global test teardown
afterAll(async () => {
  // Close database connections
  await pool.end();
  console.log('Test database connections closed');
});

// Helper to clear database between tests
export const clearDatabase = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Disable foreign key checks temporarily
    await client.query('SET CONSTRAINTS ALL DEFERRED');

    // Clear all tables
    await client.query('TRUNCATE TABLE page_views CASCADE');
    await client.query('TRUNCATE TABLE navigation_menus CASCADE');
    await client.query('TRUNCATE TABLE site_settings CASCADE');
    await client.query('TRUNCATE TABLE i18n_content CASCADE');
    await client.query('TRUNCATE TABLE languages CASCADE');
    await client.query('TRUNCATE TABLE robots_txt CASCADE');
    await client.query('TRUNCATE TABLE redirects CASCADE');
    await client.query('TRUNCATE TABLE seo_meta CASCADE');
    await client.query('TRUNCATE TABLE form_submissions CASCADE');
    await client.query('TRUNCATE TABLE forms CASCADE');
    await client.query('TRUNCATE TABLE page_components CASCADE');
    await client.query('TRUNCATE TABLE components CASCADE');
    await client.query('TRUNCATE TABLE pages CASCADE');
    await client.query('TRUNCATE TABLE posts CASCADE');
    await client.query('TRUNCATE TABLE products CASCADE');
    await client.query('TRUNCATE TABLE media CASCADE');
    await client.query('TRUNCATE TABLE users CASCADE');
    await client.query('TRUNCATE TABLE roles CASCADE');

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
