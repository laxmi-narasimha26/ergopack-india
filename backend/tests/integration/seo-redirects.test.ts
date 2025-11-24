/**
 * Integration Test 3: SEO Redirect Logic
 *
 * Tests:
 * - Marketer can create a redirect
 * - Public API returns the redirect in the list
 */

import request from 'supertest';
import app from '../../src/server';
import { pool } from '../../src/config/database';
import { hashPassword } from '../../src/utils/password';
import { generateToken } from '../../src/utils/jwt';

describe('SEO Redirect Integration Tests', () => {
  let marketerToken: string;
  let redirectId: string;

  beforeAll(async () => {
    // Clear relevant tables
    await pool.query('TRUNCATE TABLE redirects, users, roles CASCADE');

    // Create Marketer role
    const roleResult = await pool.query(
      `
      INSERT INTO roles (name, display_name, permissions)
      VALUES ('marketer', 'Marketer', $1)
      RETURNING id
    `,
      [JSON.stringify(['pages.*', 'blog.*', 'seo.*', 'leads.*', 'media.*'])]
    );

    // Create Marketer user
    const passwordHash = await hashPassword('password123');
    const userResult = await pool.query(
      `
      INSERT INTO users (email, password_hash, name, role_id)
      VALUES ('marketer@test.com', $1, 'Marketer User', $2)
      RETURNING id
    `,
      [passwordHash, roleResult.rows[0].id]
    );

    // Generate token
    marketerToken = generateToken({
      userId: userResult.rows[0].id,
      email: 'marketer@test.com',
      roleId: roleResult.rows[0].id,
      permissions: ['pages.*', 'blog.*', 'seo.*', 'leads.*', 'media.*'],
    });
  });

  afterAll(async () => {
    await pool.query('TRUNCATE TABLE redirects, users, roles CASCADE');
  });

  it('should ALLOW marketer to create a 301 redirect (201 Created)', async () => {
    const response = await request(app)
      .post('/api/seo/redirects')
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({
        from_path: '/old-page',
        to_path: '/new-page',
        type: 301,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.from_path).toBe('/old-page');
    expect(response.body.data.to_path).toBe('/new-page');
    expect(response.body.data.type).toBe(301);
    expect(response.body.data.is_active).toBe(true);

    redirectId = response.body.data.id;
  });

  it('should return the new redirect in public API (/api/public/redirects)', async () => {
    const response = await request(app).get('/api/public/redirects');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    // Find our redirect
    const redirect = response.body.data.find((r: any) => r.from_path === '/old-page');

    expect(redirect).toBeDefined();
    expect(redirect.to_path).toBe('/new-page');
    expect(redirect.type).toBe(301);
    expect(redirect.is_active).toBe(true);
  });

  it('should prevent duplicate from_path redirects', async () => {
    const response = await request(app)
      .post('/api/seo/redirects')
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({
        from_path: '/old-page', // Same as before
        to_path: '/another-page',
        type: 301,
      });

    expect(response.status).toBe(409); // Conflict
    expect(response.body.success).toBe(false);
  });

  it('should allow updating a redirect', async () => {
    const response = await request(app)
      .put(`/api/seo/redirects/${redirectId}`)
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({
        to_path: '/updated-page',
        type: 302,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.to_path).toBe('/updated-page');
    expect(response.body.data.type).toBe(302);
  });

  it('should allow deactivating a redirect', async () => {
    const response = await request(app)
      .put(`/api/seo/redirects/${redirectId}`)
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({
        is_active: false,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.is_active).toBe(false);

    // Verify it's not in public API anymore (only active redirects)
    const publicResponse = await request(app).get('/api/public/redirects');

    const inactiveRedirect = publicResponse.body.data.find((r: any) => r.id === redirectId);

    expect(inactiveRedirect).toBeUndefined(); // Should not be in active list
  });

  it('should allow deleting a redirect', async () => {
    const response = await request(app)
      .delete(`/api/seo/redirects/${redirectId}`)
      .set('Authorization', `Bearer ${marketerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // Verify it's gone
    const getResponse = await request(app)
      .get(`/api/seo/redirects/${redirectId}`)
      .set('Authorization', `Bearer ${marketerToken}`);

    expect(getResponse.status).toBe(404);
  });
});
