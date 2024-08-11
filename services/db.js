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
    // Create roles table and insert predefined roles
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    // Seed data for roles table
    await pool.query(`
      INSERT INTO roles (name) VALUES
      ('user'),
      ('owner'),
      ('admin')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Create user_statuses table and insert data
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_statuses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    await pool.query(`
      INSERT INTO user_statuses (name) VALUES
      ('pending'),
      ('approved'),
      ('disabled')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Create rental_statuses table and insert data
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rental_statuses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    await pool.query(`
      INSERT INTO rental_statuses (name) VALUES
      ('rented'),
      ('free')
      ON CONFLICT (name) DO NOTHING;
    `);

    // Create users table with reference to the roles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        earnings INTEGER DEFAULT 0,
        role_id INTEGER REFERENCES roles(id) NOT NULL,
        user_status_id INTEGER REFERENCES user_statuses(id) NOT NULL
      );
    `);

    // Continue creating the remaining tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        owner_id INTEGER REFERENCES users(id),
        cover_photo VARCHAR(255)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        profile_photo VARCHAR(255)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS rentals (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) NOT NULL,
        renter_id INTEGER REFERENCES users(id) NOT NULL,
        rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        return_date TIMESTAMP,
        rental_status_id INTEGER REFERENCES rental_statuses(id) NOT NULL
      );
    `);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

createTables();

export default pool;
