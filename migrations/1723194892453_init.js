// migrations/1723108694951_init.cjs
exports.up = (pgm) => {
  pgm.createTable('roles', {
    id: 'id',
    name: { type: 'varchar(50)', notNull: true, unique: true },
  });
  
  pgm.createTable('user_statuses', {
    id: 'id',
    name: { type: 'varchar(50)', notNull: true, unique: true },
  });

  // Seed the user_statuses table
  pgm.sql("INSERT INTO user_statuses (name) VALUES ('pending'), ('approved'), ('disabled')");


  pgm.createTable('rental_statuses', {
    id: 'id',
    name: { type: 'varchar(50)', notNull: true, unique: true },
  });

  // Seed the user_statuses table
  pgm.sql("INSERT INTO rental_statuses (name) VALUES ('rented'), ('free')");


  pgm.createTable('users', {
    id: 'id',
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    location: { type: 'varchar(255)', notNull: true },
    phone_number: { type: 'varchar(255)', notNull: true },
    earnings: { type: 'integer', notNull: true, default:0 },
    role_id: { type: 'integer', notNull: true, references: 'roles(id)' },
    user_status_id: { type: 'integer', notNull: true, references: 'user_statuses(id)' },
  });

  pgm.createTable('categories', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true, unique: true },
  });

  pgm.createTable('books', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    author: { type: 'varchar(255)', notNull: true },
    quantity: { type: 'integer', notNull: true },
    price: { type: 'numeric', notNull: true },  
    category_id: { type: 'integer', notNull: true, references: 'categories(id)' },
    owner_id: { type: 'integer', notNull: true, references: 'users(id)' },
    cover_photo: { type: 'varchar(255)' }  
  });

    pgm.createTable('profiles', {
    id: 'id',
    firstname: { type: 'varchar(255)', notNull: true },
    lastname: { type: 'varchar(255)', notNull: true },
    user_id: { type: 'integer', notNull: true, references: 'users(id)' },
    profile_photo: { type: 'varchar(255)' } 
  });

  pgm.createTable('rentals', {
    id: 'id',
    book_id: { type: 'integer', notNull: true, references: 'books(id)' },
    renter_id: { type: 'integer', notNull: true, references: 'users(id)' },
    rental_date: { type: 'timestamp', default: pgm.func('current_timestamp') },
    return_date: { type: 'timestamp' },
    rental_status_id: { type: 'integer', notNull: true, references: 'rental_statuses(id)'},
  });

};


exports.down = (pgm) => {
  pgm.dropTable('rental_statuses');
  pgm.dropTable('rentals');
  pgm.dropTable('books');
  pgm.dropTable('categories');
  pgm.dropTable('users');
  pgm.dropTable('roles');
  pgm.dropTable('user_statuses');
  pgm.dropTable('profiles');
};
