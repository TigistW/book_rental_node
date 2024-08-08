// models/Book.js
import pool from '../services/db.js';

class Book {
  static async create({ title, author, quantity, ownerId, categoryId }) {
    const result = await pool.query(
      'INSERT INTO books (title, author, quantity, owner_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, quantity, ownerId, categoryId]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByOwner(ownerId) {
    const result = await pool.query('SELECT * FROM books WHERE owner_id = $1', [ownerId]);
    return result.rows;
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
  }

  static async updateById(id, updates) {
    const { title, author, quantity, categoryId } = updates;
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, quantity = $3, category_id = $4 WHERE id = $5 RETURNING *',
      [title, author, quantity, categoryId, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

export default Book;
