// models/Role.js
import pool from '../services/db.js';

class UserStatus {
  static async findByName(name) {
    const result = await pool.query('SELECT * FROM user_statuses WHERE name = $1', [name]);
    return result.rows[0];
  }
}

export default UserStatus;
