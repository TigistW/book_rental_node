import pool from '../book_rental_node/services/db.js';

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
}
);