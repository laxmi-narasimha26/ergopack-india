import { pool, query } from '../config/database';
import { Product, Media } from '../types';

export class ProductRepository {
  async findAll(limit = 50, offset = 0, publishedOnly = false): Promise<Product[]> {
    let sql = `
      SELECT p.*,
             pm.id as primary_image_id, pm.filename as primary_image_filename, pm.url as primary_image_url,
             pm.mime_type as primary_image_mime_type, pm.size as primary_image_size,
             pm.width as primary_image_width, pm.height as primary_image_height,
             pm.alt_text as primary_image_alt_text, pm.title as primary_image_title,
             pm.description as primary_image_description, pm.created_at as primary_image_created_at,
             pm.updated_at as primary_image_updated_at
      FROM products p
      LEFT JOIN media pm ON p.primary_image_id = pm.id
    `;

    if (publishedOnly) {
      sql += ' WHERE p.is_published = true';
    }

    sql += ` ORDER BY p.sort_order ASC, p.created_at DESC LIMIT $1 OFFSET $2`;

    const result = await query(sql, [limit, offset]);
    return Promise.all(result.rows.map((row) => this.mapRow(row)));
  }

  async findById(id: string): Promise<Product | null> {
    const sql = `
      SELECT p.*,
             pm.id as primary_image_id, pm.filename as primary_image_filename, pm.url as primary_image_url,
             pm.mime_type as primary_image_mime_type, pm.size as primary_image_size,
             pm.width as primary_image_width, pm.height as primary_image_height,
             pm.alt_text as primary_image_alt_text, pm.title as primary_image_title,
             pm.description as primary_image_description, pm.created_at as primary_image_created_at,
             pm.updated_at as primary_image_updated_at
      FROM products p
      LEFT JOIN media pm ON p.primary_image_id = pm.id
      WHERE p.id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findBySlug(slug: string, publishedOnly = false): Promise<Product | null> {
    let sql = `
      SELECT p.*,
             pm.id as primary_image_id, pm.filename as primary_image_filename, pm.url as primary_image_url,
             pm.mime_type as primary_image_mime_type, pm.size as primary_image_size,
             pm.width as primary_image_width, pm.height as primary_image_height,
             pm.alt_text as primary_image_alt_text, pm.title as primary_image_title,
             pm.description as primary_image_description, pm.created_at as primary_image_created_at,
             pm.updated_at as primary_image_updated_at
      FROM products p
      LEFT JOIN media pm ON p.primary_image_id = pm.id
      WHERE p.slug = $1
    `;

    if (publishedOnly) {
      sql += ' AND p.is_published = true';
    }

    const result = await query(sql, [slug]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findByCategory(category: string, publishedOnly = false): Promise<Product[]> {
    let sql = `
      SELECT p.*,
             pm.id as primary_image_id, pm.filename as primary_image_filename, pm.url as primary_image_url,
             pm.mime_type as primary_image_mime_type, pm.size as primary_image_size,
             pm.width as primary_image_width, pm.height as primary_image_height,
             pm.alt_text as primary_image_alt_text, pm.title as primary_image_title,
             pm.description as primary_image_description, pm.created_at as primary_image_created_at,
             pm.updated_at as primary_image_updated_at
      FROM products p
      LEFT JOIN media pm ON p.primary_image_id = pm.id
      WHERE p.category = $1
    `;

    if (publishedOnly) {
      sql += ' AND p.is_published = true';
    }

    sql += ` ORDER BY p.sort_order ASC, p.created_at DESC`;

    const result = await query(sql, [category]);
    return Promise.all(result.rows.map((row) => this.mapRow(row)));
  }

  async create(data: Partial<Product>): Promise<Product> {
    const sql = `
      INSERT INTO products (
        name, slug, sku, category, product_line, tagline, short_description,
        long_description, specifications, features, gallery_ids, primary_image_id,
        brochure_ids, video_urls, price, is_published, published_at, sort_order,
        created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING id
    `;
    const result = await query(sql, [
      data.name,
      data.slug,
      data.sku || null,
      data.category || null,
      data.product_line || null,
      data.tagline || null,
      data.short_description || null,
      data.long_description ? JSON.stringify(data.long_description) : null,
      data.specifications ? JSON.stringify(data.specifications) : null,
      data.features ? JSON.stringify(data.features) : null,
      data.gallery_ids ? JSON.stringify(data.gallery_ids) : null,
      data.primary_image_id || null,
      data.brochure_ids ? JSON.stringify(data.brochure_ids) : null,
      data.video_urls ? JSON.stringify(data.video_urls) : null,
      data.price || null,
      data.is_published ?? false,
      data.published_at || null,
      data.sort_order ?? 0,
      data.created_by || null,
    ]);
    return this.findById(result.rows[0].id) as Promise<Product>;
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
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
    if (data.sku !== undefined) {
      fields.push(`sku = $${paramCount++}`);
      values.push(data.sku);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.product_line !== undefined) {
      fields.push(`product_line = $${paramCount++}`);
      values.push(data.product_line);
    }
    if (data.tagline !== undefined) {
      fields.push(`tagline = $${paramCount++}`);
      values.push(data.tagline);
    }
    if (data.short_description !== undefined) {
      fields.push(`short_description = $${paramCount++}`);
      values.push(data.short_description);
    }
    if (data.long_description !== undefined) {
      fields.push(`long_description = $${paramCount++}`);
      values.push(data.long_description ? JSON.stringify(data.long_description) : null);
    }
    if (data.specifications !== undefined) {
      fields.push(`specifications = $${paramCount++}`);
      values.push(data.specifications ? JSON.stringify(data.specifications) : null);
    }
    if (data.features !== undefined) {
      fields.push(`features = $${paramCount++}`);
      values.push(data.features ? JSON.stringify(data.features) : null);
    }
    if (data.gallery_ids !== undefined) {
      fields.push(`gallery_ids = $${paramCount++}`);
      values.push(data.gallery_ids ? JSON.stringify(data.gallery_ids) : null);
    }
    if (data.primary_image_id !== undefined) {
      fields.push(`primary_image_id = $${paramCount++}`);
      values.push(data.primary_image_id);
    }
    if (data.brochure_ids !== undefined) {
      fields.push(`brochure_ids = $${paramCount++}`);
      values.push(data.brochure_ids ? JSON.stringify(data.brochure_ids) : null);
    }
    if (data.video_urls !== undefined) {
      fields.push(`video_urls = $${paramCount++}`);
      values.push(data.video_urls ? JSON.stringify(data.video_urls) : null);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.is_published !== undefined) {
      fields.push(`is_published = $${paramCount++}`);
      values.push(data.is_published);
    }
    if (data.published_at !== undefined) {
      fields.push(`published_at = $${paramCount++}`);
      values.push(data.published_at);
    }
    if (data.sort_order !== undefined) {
      fields.push(`sort_order = $${paramCount++}`);
      values.push(data.sort_order);
    }
    if (data.updated_by !== undefined) {
      fields.push(`updated_by = $${paramCount++}`);
      values.push(data.updated_by);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    const sql = `
      UPDATE products
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id
    `;

    const result = await query(sql, values);
    return result.rows.length > 0 ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const sql = 'DELETE FROM products WHERE id = $1';
    const result = await query(sql, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async count(publishedOnly = false): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM products';
    if (publishedOnly) {
      sql += ' WHERE is_published = true';
    }
    const result = await query(sql);
    return parseInt(result.rows[0].count);
  }

  async search(searchTerm: string, publishedOnly = false): Promise<Product[]> {
    let sql = `
      SELECT p.*,
             pm.id as primary_image_id, pm.filename as primary_image_filename, pm.url as primary_image_url,
             pm.mime_type as primary_image_mime_type, pm.size as primary_image_size,
             pm.width as primary_image_width, pm.height as primary_image_height,
             pm.alt_text as primary_image_alt_text, pm.title as primary_image_title,
             pm.description as primary_image_description, pm.created_at as primary_image_created_at,
             pm.updated_at as primary_image_updated_at
      FROM products p
      LEFT JOIN media pm ON p.primary_image_id = pm.id
      WHERE p.name ILIKE $1 OR p.slug ILIKE $1 OR p.short_description ILIKE $1
    `;

    if (publishedOnly) {
      sql += ' AND p.is_published = true';
    }

    sql += ` ORDER BY p.sort_order ASC, p.created_at DESC`;

    const result = await query(sql, [`%${searchTerm}%`]);
    return Promise.all(result.rows.map((row) => this.mapRow(row)));
  }

  private async mapRow(row: any): Promise<Product> {
    // Get gallery media if gallery_ids exist
    let gallery: Media[] = [];
    if (row.gallery_ids && Array.isArray(row.gallery_ids)) {
      const galleryResult = await query('SELECT * FROM media WHERE id = ANY($1)', [
        row.gallery_ids,
      ]);
      gallery = galleryResult.rows;
    }

    // Get brochures if brochure_ids exist
    let brochures: Media[] = [];
    if (row.brochure_ids && Array.isArray(row.brochure_ids)) {
      const brochuresResult = await query('SELECT * FROM media WHERE id = ANY($1)', [
        row.brochure_ids,
      ]);
      brochures = brochuresResult.rows;
    }

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      sku: row.sku,
      category: row.category,
      product_line: row.product_line,
      tagline: row.tagline,
      short_description: row.short_description,
      long_description: row.long_description ? JSON.parse(row.long_description) : undefined,
      specifications: row.specifications ? JSON.parse(row.specifications) : undefined,
      features: row.features ? JSON.parse(row.features) : undefined,
      gallery_ids: row.gallery_ids,
      gallery,
      primary_image_id: row.primary_image_id,
      primary_image: row.primary_image_id
        ? {
            id: row.primary_image_id,
            filename: row.primary_image_filename,
            original_filename: row.primary_image_filename,
            mime_type: row.primary_image_mime_type,
            size: row.primary_image_size,
            width: row.primary_image_width,
            height: row.primary_image_height,
            url: row.primary_image_url,
            alt_text: row.primary_image_alt_text,
            title: row.primary_image_title,
            description: row.primary_image_description,
            created_at: new Date(row.primary_image_created_at),
            updated_at: new Date(row.primary_image_updated_at),
          }
        : undefined,
      brochure_ids: row.brochure_ids,
      brochures,
      video_urls: row.video_urls ? JSON.parse(row.video_urls) : undefined,
      price: row.price,
      is_published: row.is_published,
      published_at: row.published_at ? new Date(row.published_at) : undefined,
      sort_order: row.sort_order,
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

export default new ProductRepository();
