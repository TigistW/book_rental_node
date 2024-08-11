// models/Category.js
import pool from '../services/db.js';

class BookCategory {
  static async create({ name }) {
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  }

   static async findByName(name) {
    const result = await pool.query('SELECT * FROM categories WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  }

  static async updateById(id, name) {
    const result = await pool.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

export default BookCategory;
