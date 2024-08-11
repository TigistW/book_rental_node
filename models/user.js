import pkg from 'pg';
import bcrypt from 'bcrypt';
import pool from '../services/db.js';

const { Pool } = pkg;

class User {
  static async create({ email, password, location, phoneNumber, roleName, userStatus }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
    const roleId = roleResult.rows[0].id;

    const statusResult = await pool.query("SELECT id FROM user_statuses WHERE name = $1",[userStatus]);
    const statusId = statusResult.rows[0].id;

    

    const result = await pool.query(
      'INSERT INTO users (email, password, location, phone_number, role_id, user_status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, hashedPassword, location, phoneNumber, roleId, statusId]
    );
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  static async updateById(id, { email, location, phoneNumber, roleName, userStatus }) {
    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
    const roleId = roleResult.rows[0].id;

    const statusResult = await pool.query('SELECT id FROM user_statuses WHERE name = $1', [userStatus]);
    const statusId = statusResult.rows[0].id;

    const result = await pool.query(
      'UPDATE users SET email = $1, location = $2, phone_number = $3, role_id = $4, user_status_id = $5 WHERE id = $6 RETURNING *',
      [email, location, phoneNumber, roleId, statusId, id]
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async comparePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
  }
  
  static async findByRole(roleName) {
    const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
    const roleId = roleResult.rows[0].id;

    const result = await pool.query('SELECT * FROM users WHERE role_id = $1', [roleId]);
    return result.rows;
  }

}

export default User;
