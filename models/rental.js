import pool from '../services/db.js';

class Rental {
  static async create({ book_id, renter_id, return_date }) {
    const result = await pool.query(
      'INSERT INTO rentals (book_id, renter_id, return_date) VALUES ($1, $2, $3) RETURNING *',
      [book_id, renter_id, return_date]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM rentals WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM rentals');
    return result.rows;
  }

  static async updateById(id, { return_date, status }) {
    const result = await pool.query(
      'UPDATE rentals SET return_date = $1, status = $2 WHERE id = $3 RETURNING *',
      [return_date, status, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query('DELETE FROM rentals WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

export default Rental;
