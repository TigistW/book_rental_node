// models/Role.js
import pool from '../services/db.js';

class Role {
  static async findByName(name) {
    const result = await pool.query('SELECT * FROM roles WHERE name = $1', [name]);
    return result.rows[0];
  }
}

export default Role;
