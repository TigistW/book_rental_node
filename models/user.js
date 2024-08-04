import pkg from 'pg';
import bcrypt from 'bcrypt';
import pool from '../services/db.js';

const { Pool } = pkg;

class User {
  static async create({ email, password, location, phoneNumber, roleName }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
    const roleId = roleResult.rows[0].id;

    const result = await pool.query(
      'INSERT INTO users (email, password, location, phone_number, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [email, hashedPassword, location, phoneNumber, roleId]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async comparePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
}

export default User;
