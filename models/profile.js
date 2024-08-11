import pkg from 'pg';
import bcrypt from 'bcrypt';
import pool from '../services/db.js';

const { Pool } = pkg;

class Profile {
  static async create({ firstname, lastname,userId, profilePhoto }) {
    const result = await pool.query(
      'INSERT INTO books (firstname, lastname, user_id, profile_photo) VALUES ($1, $2, $3, $4) RETURNING *',
      [firstname, lastname,userId, profilePhoto]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM profiles WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByUser(userId) {
    const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM profiles');
    return result.rows;
  }

  static async updateById(id, updates) {
    const {firstname, lastname,userId, profilePhoto} = updates;
    const result = await pool.query(
      'UPDATE books SET firstname = $1, lastname = $2, user_id = $3, profile_photo = $4 WHERE id = $5 RETURNING *',
      [firstname, lastname,userId, profilePhoto, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query('DELETE FROM profiles WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

export default Profile;
