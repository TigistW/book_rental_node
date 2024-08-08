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
    // Create categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    // Create books table with reference to categories and users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        owner_id INTEGER REFERENCES users(id),
        category_id INTEGER REFERENCES categories(id)
      );
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables();

export default pool;
