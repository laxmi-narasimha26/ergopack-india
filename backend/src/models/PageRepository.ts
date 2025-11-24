import { pool, query } from '../config/database';
import { Page, PageComponent, Component } from '../types';

export class PageRepository {
  async findAll(limit = 50, offset = 0): Promise<Page[]> {
    const sql = `
      SELECT * FROM pages
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await query(sql, [limit, offset]);
    return Promise.all(result.rows.map((row) => this.mapRow(row)));
  }

  async findById(id: string): Promise<Page | null> {
    const sql = 'SELECT * FROM pages WHERE id = $1';
    const result = await query(sql, [id]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findBySlug(slug: string, publishedOnly = false): Promise<Page | null> {
    let sql = 'SELECT * FROM pages WHERE slug = $1';
    if (publishedOnly) {
      sql += ' AND is_published = true';
    }
    const result = await query(sql, [slug]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async create(data: Partial<Page>): Promise<Page> {
    const sql = `
      INSERT INTO pages (name, slug, title, description, is_published, template)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    const result = await query(sql, [
      data.name,
      data.slug,
      data.title || null,
      data.description || null,
      data.is_published ?? false,
      data.template || 'default',
    ]);
    return this.findById(result.rows[0].id) as Promise<Page>;
  }

  async update(id: string, data: Partial<Page>): Promise<Page | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.slug !== undefined) {
      fields.push(`slug = $${paramCount++}`);
      values.push(data.slug);
    }
    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.is_published !== undefined) {
      fields.push(`is_published = $${paramCount++}`);
      values.push(data.is_published);
    }
    if (data.template !== undefined) {
      fields.push(`template = $${paramCount++}`);
      values.push(data.template);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    const sql = `
      UPDATE pages
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id
    `;

    const result = await query(sql, values);
    return result.rows.length > 0 ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const sql = 'DELETE FROM pages WHERE id = $1';
    const result = await query(sql, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async count(): Promise<number> {
    const sql = 'SELECT COUNT(*) as count FROM pages';
    const result = await query(sql);
    return parseInt(result.rows[0].count);
  }

  /**
   * Get page components
   */
  async getPageComponents(pageId: string): Promise<PageComponent[]> {
    const sql = `
      SELECT pc.*, c.type as component_type, c.name as component_name,
             c.default_props as component_default_props, c.schema as component_schema
      FROM page_components pc
      LEFT JOIN components c ON pc.component_id = c.id
      WHERE pc.page_id = $1
      ORDER BY pc.sort_order ASC
    `;
    const result = await query(sql, [pageId]);
    return result.rows.map((row) => this.mapPageComponentRow(row));
  }

  /**
   * Add component to page
   */
  async addComponent(
    pageId: string,
    componentId: string,
    props: Record<string, any>
  ): Promise<PageComponent> {
    // Get next sort order
    const sortResult = await query(
      'SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM page_components WHERE page_id = $1',
      [pageId]
    );
    const sortOrder = sortResult.rows[0].next_order;

    const sql = `
      INSERT INTO page_components (page_id, component_id, props, sort_order, is_visible)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const result = await query(sql, [pageId, componentId, JSON.stringify(props), sortOrder, true]);

    const componentResult = await query(
      `SELECT pc.*, c.type as component_type, c.name as component_name,
              c.default_props as component_default_props, c.schema as component_schema
       FROM page_components pc
       LEFT JOIN components c ON pc.component_id = c.id
       WHERE pc.id = $1`,
      [result.rows[0].id]
    );

    return this.mapPageComponentRow(componentResult.rows[0]);
  }

  /**
   * Update page component
   */
  async updateComponent(
    componentId: string,
    props: Record<string, any>,
    isVisible?: boolean
  ): Promise<PageComponent | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    fields.push(`props = $${paramCount++}`);
    values.push(JSON.stringify(props));

    if (isVisible !== undefined) {
      fields.push(`is_visible = $${paramCount++}`);
      values.push(isVisible);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(componentId);

    const sql = `
      UPDATE page_components
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, page_id
    `;

    const result = await query(sql, values);
    if (result.rows.length === 0) return null;

    const componentResult = await query(
      `SELECT pc.*, c.type as component_type, c.name as component_name,
              c.default_props as component_default_props, c.schema as component_schema
       FROM page_components pc
       LEFT JOIN components c ON pc.component_id = c.id
       WHERE pc.id = $1`,
      [result.rows[0].id]
    );

    return this.mapPageComponentRow(componentResult.rows[0]);
  }

  /**
   * Remove component from page
   */
  async removeComponent(componentId: string): Promise<boolean> {
    const sql = 'DELETE FROM page_components WHERE id = $1';
    const result = await query(sql, [componentId]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * Reorder page components
   */
  async reorderComponents(
    pageId: string,
    components: Array<{ id: string; sort_order: number }>
  ): Promise<void> {
    const promises = components.map((comp) =>
      query(
        'UPDATE page_components SET sort_order = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND page_id = $3',
        [comp.sort_order, comp.id, pageId]
      )
    );
    await Promise.all(promises);
  }

  private async mapRow(row: any): Promise<Page> {
    // Get page components
    const components = await this.getPageComponents(row.id);

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      title: row.title,
      description: row.description,
      is_published: row.is_published,
      template: row.template,
      components,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  private mapPageComponentRow(row: any): PageComponent {
    return {
      id: row.id,
      page_id: row.page_id,
      component_id: row.component_id,
      component: row.component_type
        ? {
            id: row.component_id,
            type: row.component_type,
            name: row.component_name,
            default_props: row.component_default_props
              ? JSON.parse(row.component_default_props)
              : {},
            schema: row.component_schema ? JSON.parse(row.component_schema) : undefined,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          }
        : undefined,
      props: row.props ? JSON.parse(row.props) : {},
      sort_order: row.sort_order,
      is_visible: row.is_visible,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

export default new PageRepository();
