import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  try {
    // Create roles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    // Insert predefined roles
    await pool.query(`
      INSERT INTO roles (name) VALUES
      ('user'),
      ('owner'),
      ('admin')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Create users table with reference to roles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        role_id INTEGER REFERENCES roles(id) NOT NULL
      );
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables();

export default pool;
