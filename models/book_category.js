// models/BookCategory.js
import pool from '../services/db.js';

class BookCategory {
  static async create({ name }) {
    const result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name]
    );
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
}

export default BookCategory;