/**
 * Integration Test 2: Dynamic Page Builder Logic
 *
 * Tests:
 * - Marketer can reorder components on a page
 * - Public API returns components in the new order
 */

import request from 'supertest';
import app from '../../src/server';
import { pool } from '../../src/config/database';
import { hashPassword } from '../../src/utils/password';
import { generateToken } from '../../src/utils/jwt';

describe('Dynamic Page Builder Integration Tests', () => {
  let marketerToken: string;
  let pageId: string;
  let component1Id: string;
  let component2Id: string;
  let component3Id: string;

  beforeAll(async () => {
    // Clear relevant tables
    await pool.query('TRUNCATE TABLE page_components, pages, components, users, roles CASCADE');

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

    // Create test page
    const pageResult = await pool.query(`
      INSERT INTO pages (name, slug, is_published)
      VALUES ('Test Page', 'test-page', true)
      RETURNING id
    `);
    pageId = pageResult.rows[0].id;

    // Create test components
    const comp1 = await pool.query(`
      INSERT INTO components (type, name, default_props)
      VALUES ('hero', 'Hero Component', '{}')
      RETURNING id
    `);
    component1Id = comp1.rows[0].id;

    const comp2 = await pool.query(`
      INSERT INTO components (type, name, default_props)
      VALUES ('cta', 'CTA Component', '{}')
      RETURNING id
    `);
    component2Id = comp2.rows[0].id;

    const comp3 = await pool.query(`
      INSERT INTO components (type, name, default_props)
      VALUES ('features', 'Features Component', '{}')
      RETURNING id
    `);
    component3Id = comp3.rows[0].id;

    // Add components to page in initial order: 1, 2, 3
    await pool.query(
      `
      INSERT INTO page_components (page_id, component_id, props, sort_order)
      VALUES
        ($1, $2, '{"title": "Component 1"}', 1),
        ($1, $3, '{"title": "Component 2"}', 2),
        ($1, $4, '{"title": "Component 3"}', 3)
    `,
      [pageId, component1Id, component2Id, component3Id]
    );
  });

  afterAll(async () => {
    await pool.query('TRUNCATE TABLE page_components, pages, components, users, roles CASCADE');
  });

  it('should ALLOW marketer to reorder page components (200 OK)', async () => {
    // Get initial component IDs in order
    const initialComponents = await pool.query(
      `
      SELECT id, component_id, sort_order
      FROM page_components
      WHERE page_id = $1
      ORDER BY sort_order
    `,
      [pageId]
    );

    expect(initialComponents.rows.length).toBe(3);
    expect(initialComponents.rows[0].sort_order).toBe(1);
    expect(initialComponents.rows[1].sort_order).toBe(2);
    expect(initialComponents.rows[2].sort_order).toBe(3);

    // Reorder: Component 3, Component 1, Component 2
    const newOrder = [
      { id: initialComponents.rows[2].id, sort_order: 1 }, // Component 3
      { id: initialComponents.rows[0].id, sort_order: 2 }, // Component 1
      { id: initialComponents.rows[1].id, sort_order: 3 }, // Component 2
    ];

    const response = await request(app)
      .put(`/api/pages/${pageId}/components/reorder`)
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({ components: newOrder });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return components in NEW ORDER via public API', async () => {
    const response = await request(app).get('/api/public/page/test-page');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.components).toBeDefined();
    expect(response.body.data.components.length).toBe(3);

    // Verify the new order: Component 3, Component 1, Component 2
    const components = response.body.data.components;
    expect(components[0].component_id).toBe(component3Id);
    expect(components[1].component_id).toBe(component1Id);
    expect(components[2].component_id).toBe(component2Id);
  });

  it('should maintain component props after reordering', async () => {
    const response = await request(app).get('/api/public/page/test-page');

    const components = response.body.data.components;
    expect(components[0].props.title).toBe('Component 3');
    expect(components[1].props.title).toBe('Component 1');
    expect(components[2].props.title).toBe('Component 2');
  });

  it('should prevent duplicate sort_orders', async () => {
    const initialComponents = await pool.query(
      `
      SELECT id FROM page_components WHERE page_id = $1 ORDER BY sort_order
    `,
      [pageId]
    );

    // Try to set duplicate sort orders
    const invalidOrder = [
      { id: initialComponents.rows[0].id, sort_order: 1 },
      { id: initialComponents.rows[1].id, sort_order: 1 }, // Duplicate!
      { id: initialComponents.rows[2].id, sort_order: 3 },
    ];

    const response = await request(app)
      .put(`/api/pages/${pageId}/components/reorder`)
      .set('Authorization', `Bearer ${marketerToken}`)
      .send({ components: invalidOrder });

    // Should fail validation
    expect(response.status).toBe(400);
  });
});
