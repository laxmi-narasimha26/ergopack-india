import { pool, query } from '../config/database';
import { User, Role } from '../types';

export class UserRepository {
  async findAll(limit = 50, offset = 0): Promise<User[]> {
    const sql = `
      SELECT u.*, r.name as role_name, r.display_name as role_display_name,
             r.permissions as role_permissions
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      ORDER BY u.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await query(sql, [limit, offset]);
    return result.rows.map(this.mapRow);
  }

  async findById(id: string): Promise<User | null> {
    const sql = `
      SELECT u.*, r.name as role_name, r.display_name as role_display_name,
             r.permissions as role_permissions
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
    const result = await query(sql, [id]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const sql = `
      SELECT u.*, r.name as role_name, r.display_name as role_display_name,
             r.permissions as role_permissions
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `;
    const result = await query(sql, [email]);
    return result.rows.length > 0 ? this.mapRow(result.rows[0]) : null;
  }

  async create(data: Partial<User>): Promise<User> {
    const sql = `
      INSERT INTO users (email, password_hash, name, role_id, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await query(sql, [
      data.email,
      data.password_hash,
      data.name,
      data.role_id,
      data.is_active ?? true,
    ]);
    return this.findById(result.rows[0].id) as Promise<User>;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.email !== undefined) {
      fields.push(`email = $${paramCount++}`);
      values.push(data.email);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(data.name);
    }
    if (data.role_id !== undefined) {
      fields.push(`role_id = $${paramCount++}`);
      values.push(data.role_id);
    }
    if (data.is_active !== undefined) {
      fields.push(`is_active = $${paramCount++}`);
      values.push(data.is_active);
    }
    if (data.password_hash !== undefined) {
      fields.push(`password_hash = $${paramCount++}`);
      values.push(data.password_hash);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const sql = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await query(sql, values);
    return result.rows.length > 0 ? this.findById(id) : null;
  }

  async delete(id: string): Promise<boolean> {
    const sql = 'DELETE FROM users WHERE id = $1';
    const result = await query(sql, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  async updateLastLogin(id: string): Promise<void> {
    const sql = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1';
    await query(sql, [id]);
  }

  async count(): Promise<number> {
    const sql = 'SELECT COUNT(*) as count FROM users';
    const result = await query(sql);
    return parseInt(result.rows[0].count);
  }

  private mapRow(row: any): User {
    return {
      id: row.id,
      email: row.email,
      password_hash: row.password_hash,
      name: row.name,
      role_id: row.role_id,
      role: row.role_name
        ? {
            id: row.role_id,
            name: row.role_name,
            display_name: row.role_display_name,
            permissions: row.role_permissions,
            created_at: new Date(),
            updated_at: new Date(),
          }
        : undefined,
      is_active: row.is_active,
      last_login: row.last_login ? new Date(row.last_login) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }
}

export default new UserRepository();
