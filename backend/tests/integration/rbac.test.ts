/**
 * Integration Test 1: Role-Based Access Control (RBAC)
 *
 * Tests:
 * - Sales user cannot access /api/products (should return 403)
 * - Sales user can access /api/forms/submissions (should return 200)
 */

import request from 'supertest';
import app from '../../src/server';
import { pool } from '../../src/config/database';
import { hashPassword } from '../../src/utils/password';
import { generateToken } from '../../src/utils/jwt';

describe('RBAC Integration Tests', () => {
  let salesToken: string;
  let salesUserId: string;
  let salesRoleId: string;
  let adminToken: string;

  beforeAll(async () => {
    // Clear database
    await pool.query('TRUNCATE TABLE users, roles CASCADE');

    // Create Sales role
    const roleResult = await pool.query(`
      INSERT INTO roles (name, display_name, description, permissions)
      VALUES ('sales', 'Sales', 'Sales team access', $1)
      RETURNING id
    `, [JSON.stringify(['leads.read', 'leads.update'])]);

    salesRoleId = roleResult.rows[0].id;

    // Create Admin role
    const adminRoleResult = await pool.query(`
      INSERT INTO roles (name, display_name, description, permissions)
      VALUES ('super_admin', 'Super Admin', 'Full access', $1)
      RETURNING id
    `, [JSON.stringify(['*'])]);

    const adminRoleId = adminRoleResult.rows[0].id;

    // Create Sales user
    const passwordHash = await hashPassword('password123');
    const userResult = await pool.query(`
      INSERT INTO users (email, password_hash, name, role_id)
      VALUES ('sales@test.com', $1, 'Sales User', $2)
      RETURNING id
    `, [passwordHash, salesRoleId]);

    salesUserId = userResult.rows[0].id;

    // Create Admin user
    const adminResult = await pool.query(`
      INSERT INTO users (email, password_hash, name, role_id)
      VALUES ('admin@test.com', $1, 'Admin User', $2)
      RETURNING id
    `, [passwordHash, adminRoleId]);

    // Generate tokens
    salesToken = generateToken({
      userId: salesUserId,
      email: 'sales@test.com',
      roleId: salesRoleId,
      permissions: ['leads.read', 'leads.update'],
    });

    adminToken = generateToken({
      userId: adminResult.rows[0].id,
      email: 'admin@test.com',
      roleId: adminRoleId,
      permissions: ['*'],
    });
  });

  afterAll(async () => {
    await pool.query('TRUNCATE TABLE users, roles CASCADE');
  });

  it('should DENY sales user access to GET /api/products (403 Forbidden)', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${salesToken}`);

    expect(response.status).toBe(403);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Insufficient permissions');
  });

  it('should ALLOW sales user access to GET /api/forms/submissions (200 OK)', async () => {
    // First, create a test form as admin
    await pool.query(`
      INSERT INTO forms (id, name, slug, fields, is_active)
      VALUES (uuid_generate_v4(), 'Test Form', 'test-form', $1, true)
    `, [JSON.stringify([{ name: 'name', label: 'Name', type: 'text', required: true }])]);

    const response = await request(app)
      .get('/api/forms/submissions')
      .set('Authorization', `Bearer ${salesToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should ALLOW admin user to access products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should DENY unauthenticated requests to protected routes', async () => {
    const response = await request(app)
      .get('/api/products');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it('should DENY sales user from creating products', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${salesToken}`)
      .send({
        name: 'Test Product',
        slug: 'test-product',
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toContain('Insufficient permissions');
  });
});
