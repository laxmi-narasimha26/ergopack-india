/**
 * Integration Test 4: i18n Content Retrieval
 *
 * Tests:
 * - Creating product with English and Hindi content
 * - Retrieving content with lang=en returns English
 * - Retrieving content with lang=hi returns Hindi
 */

import request from 'supertest';
import app from '../../src/server';
import { pool } from '../../src/config/database';
import { hashPassword } from '../../src/utils/password';
import { generateToken } from '../../src/utils/jwt';

describe('i18n Content Integration Tests', () => {
  let adminToken: string;
  let productId: string;
  let englishLangId: string;
  let hindiLangId: string;

  beforeAll(async () => {
    // Clear relevant tables
    await pool.query('TRUNCATE TABLE i18n_content, languages, products, users, roles CASCADE');

    // Create Admin role
    const roleResult = await pool.query(`
      INSERT INTO roles (name, display_name, permissions)
      VALUES ('super_admin', 'Super Admin', $1)
      RETURNING id
    `, [JSON.stringify(['*'])]);

    // Create Admin user
    const passwordHash = await hashPassword('password123');
    const userResult = await pool.query(`
      INSERT INTO users (email, password_hash, name, role_id)
      VALUES ('admin@test.com', $1, 'Admin User', $2)
      RETURNING id
    `, [passwordHash, roleResult.rows[0].id]);

    // Generate token
    adminToken = generateToken({
      userId: userResult.rows[0].id,
      email: 'admin@test.com',
      roleId: roleResult.rows[0].id,
      permissions: ['*'],
    });

    // Create languages
    const enResult = await pool.query(`
      INSERT INTO languages (code, name, native_name, is_default, is_active)
      VALUES ('en', 'English', 'English', true, true)
      RETURNING id
    `);
    englishLangId = enResult.rows[0].id;

    const hiResult = await pool.query(`
      INSERT INTO languages (code, name, native_name, is_default, is_active)
      VALUES ('hi', 'Hindi', 'हिन्दी', false, true)
      RETURNING id
    `);
    hindiLangId = hiResult.rows[0].id;
  });

  afterAll(async () => {
    await pool.query('TRUNCATE TABLE i18n_content, languages, products, users, roles CASCADE');
  });

  it('should create product with English title', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'My Product',
        slug: 'my-product',
        is_published: true,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('My Product');

    productId = response.body.data.id;
  });

  it('should add Hindi translation for product title', async () => {
    await pool.query(`
      INSERT INTO i18n_content (entity_type, entity_id, language_id, field_name, field_value)
      VALUES ('product', $1, $2, 'name', $3)
    `, [productId, hindiLangId, JSON.stringify('मेरा उत्पाद')]);

    const result = await pool.query(`
      SELECT * FROM i18n_content
      WHERE entity_type = 'product' AND entity_id = $1 AND language_id = $2
    `, [productId, hindiLangId]);

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].field_value).toBe(JSON.stringify('मेरा उत्पाद'));
  });

  it('should return English title when lang=en', async () => {
    const response = await request(app)
      .get(`/api/public/products/${productId}?lang=en`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('My Product');
  });

  it('should return Hindi title when lang=hi', async () => {
    const response = await request(app)
      .get(`/api/public/products/${productId}?lang=hi`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // The public API should merge i18n content
    // If Hindi translation exists, it should be returned
    expect(response.body.data.name).toBe('मेरा उत्पाद');
  });

  it('should default to English if no translation exists for language', async () => {
    // Request in German (which doesn't have a translation)
    const deResult = await pool.query(`
      INSERT INTO languages (code, name, is_active)
      VALUES ('de', 'German', true)
      RETURNING id
    `);

    const response = await request(app)
      .get(`/api/public/products/${productId}?lang=de`);

    expect(response.status).toBe(200);
    // Should fall back to original (English)
    expect(response.body.data.name).toBe('My Product');
  });

  it('should support multiple fields in different languages', async () => {
    // Add Hindi description
    await pool.query(`
      INSERT INTO i18n_content (entity_type, entity_id, language_id, field_name, field_value)
      VALUES ('product', $1, $2, 'short_description', $3)
    `, [productId, hindiLangId, JSON.stringify('यह एक महान उत्पाद है')]);

    const response = await request(app)
      .get(`/api/public/products/${productId}?lang=hi`);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('मेरा उत्पाद');
    expect(response.body.data.short_description).toBe('यह एक महान उत्पाद है');
  });

  it('should list products in specific language', async () => {
    const response = await request(app)
      .get('/api/public/products?lang=hi');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    const product = response.body.data.find((p: any) => p.id === productId);
    expect(product.name).toBe('मेरा उत्पाद');
  });
});
