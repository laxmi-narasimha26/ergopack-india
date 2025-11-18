import { pool, query } from '../config/database';
import { Post, Media, User } from '../types';

export class PostRepository {
  async findAll(limit = 50, offset = 0, publishedOnly = false): Promise<Post[]> {
    let sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
    `;

    if (publishedOnly) {
      sql += ' WHERE p.status = \'published\' AND p.published_at <= CURRENT_TIMESTAMP';
    }

    sql += ` ORDER BY p.published_at DESC LIMIT $1 OFFSET $2`;

    const result = await query(sql, [limit, offset]);
    return result.rows.map(row => this.mapRow(row));
  }

  async findById(id: string): Promise<Post | null> {
    const sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findBySlug(slug: string, publishedOnly = false): Promise<Post | null> {
    let sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.slug = $1
    `;

    if (publishedOnly) {
      sql += ' AND p.status = \'published\' AND p.published_at <= CURRENT_TIMESTAMP';
    }

    const result = await query(sql, [slug]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findFeatured(limit = 3): Promise<Post[]> {
    const sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.is_featured = true AND p.status = 'published' AND p.published_at <= CURRENT_TIMESTAMP
      ORDER BY p.published_at DESC
      LIMIT $1
    `;
    const result = await query(sql, [limit]);
    return result.rows.map(row => this.mapRow(row));
  }

  async findByCategory(category: string, publishedOnly = false): Promise<Post[]> {
    let sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.category = $1
    `;

    if (publishedOnly) {
      sql += ' AND p.status = \'published\' AND p.published_at <= CURRENT_TIMESTAMP';
    }

    sql += ` ORDER BY p.published_at DESC`;

    const result = await query(sql, [category]);
    return result.rows.map(row => this.mapRow(row));
  }

  async create(data: Partial<Post>): Promise<Post> {
    const sql = `
      INSERT INTO posts (
        title, slug, excerpt, content, cover_image_id, author_id, category, tags, status,
        is_featured, published_at, views, read_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;
    const result = await query(sql, [
      data.title,
      data.slug,
      data.excerpt || null,
      data.content ? JSON.stringify(data.content) : null,
      data.cover_image_id || null,
      data.author_id || null,
      data.category || null,
      data.tags ? JSON.stringify(data.tags) : null,
      data.status || 'draft',
      data.is_featured ?? false,
      data.published_at || null,
      data.views ?? 0,
      data.read_time || null,
    ]);
    return this.findById(result.rows[0].id) as Promise<Post>;
  }

  async update(id: string, data: Partial<Post>): Promise<Post | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.slug !== undefined) {
      fields.push(`slug = $${paramCount++}`);
      values.push(data.slug);
    }
    if (data.excerpt !== undefined) {
      fields.push(`excerpt = $${paramCount++}`);
      values.push(data.excerpt);
    }
    if (data.content !== undefined) {
      fields.push(`content = $${paramCount++}`);
      values.push(data.content ? JSON.stringify(data.content) : null);
    }
    if (data.cover_image_id !== undefined) {
      fields.push(`cover_image_id = $${paramCount++}`);
      values.push(data.cover_image_id);
    }
    if (data.author_id !== undefined) {
      fields.push(`author_id = $${paramCount++}`);
      values.push(data.author_id);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.tags !== undefined) {
      fields.push(`tags = $${paramCount++}`);
      values.push(data.tags ? JSON.stringify(data.tags) : null);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }
    if (data.is_featured !== undefined) {
      fields.push(`is_featured = $${paramCount++}`);
      values.push(data.is_featured);
    }
    if (data.published_at !== undefined) {
      fields.push(`published_at = $${paramCount++}`);
      values.push(data.published_at);
    }
    if (data.views !== undefined) {
      fields.push(`views = $${paramCount++}`);
      values.push(data.views);
    }
    if (data.read_time !== undefined) {
      fields.push(`read_time = $${paramCount++}`);
      values.push(data.read_time);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);
    const sql = `
      UPDATE posts
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id
    `;

    const result = await query(sql, values);
    return result.rows.length > 0 ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const sql = 'DELETE FROM posts WHERE id = $1';
    const result = await query(sql, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async count(publishedOnly = false): Promise<number> {
    let sql = 'SELECT COUNT(*) as count FROM posts';
    if (publishedOnly) {
      sql += ' WHERE status = \'published\' AND published_at <= CURRENT_TIMESTAMP';
    }
    const result = await query(sql);
    return parseInt(result.rows[0].count);
  }

  async search(searchTerm: string, publishedOnly = false): Promise<Post[]> {
    let sql = `
      SELECT p.*,
             ci.filename as cover_image_filename, ci.url as cover_image_url,
             ci.mime_type as cover_image_mime_type, ci.size as cover_image_size,
             ci.width as cover_image_width, ci.height as cover_image_height,
             ci.alt_text as cover_image_alt_text, ci.title as cover_image_title,
             ci.description as cover_image_description, ci.created_at as cover_image_created_at,
             ci.updated_at as cover_image_updated_at,
             u.id as author_id, u.email as author_email, u.name as author_name
      FROM posts p
      LEFT JOIN media ci ON p.cover_image_id = ci.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.title ILIKE $1 OR p.slug ILIKE $1 OR p.excerpt ILIKE $1
    `;

    if (publishedOnly) {
      sql += ' AND p.status = \'published\' AND p.published_at <= CURRENT_TIMESTAMP';
    }

    sql += ` ORDER BY p.published_at DESC`;

    const result = await query(sql, [`%${searchTerm}%`]);
    return result.rows.map(row => this.mapRow(row));
  }

  async incrementViews(id: string): Promise<void> {
    const sql = 'UPDATE posts SET views = views + 1 WHERE id = $1';
    await query(sql, [id]);
  }

  private mapRow(row: any): Post {
    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content ? JSON.parse(row.content) : undefined,
      cover_image_id: row.cover_image_id,
      cover_image: row.cover_image_id
        ? {
            id: row.cover_image_id,
            filename: row.cover_image_filename,
            original_filename: row.cover_image_filename,
            mime_type: row.cover_image_mime_type,
            size: row.cover_image_size,
            width: row.cover_image_width,
            height: row.cover_image_height,
            url: row.cover_image_url,
            alt_text: row.cover_image_alt_text,
            title: row.cover_image_title,
            description: row.cover_image_description,
            created_at: new Date(row.cover_image_created_at),
            updated_at: new Date(row.cover_image_updated_at),
          }
        : undefined,
      author_id: row.author_id,
      author: row.author_id
        ? {
            id: row.author_id,
            email: row.author_email,
            name: row.author_name,
            role_id: '',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date(),
          }
        : undefined,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
      status: row.status,
      is_featured: row.is_featured,
      published_at: row.published_at ? new Date(row.published_at) : undefined,
      views: row.views,
      read_time: row.read_time,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

export default new PostRepository();
