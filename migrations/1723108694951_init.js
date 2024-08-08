exports.up = (pgm) => {

  pgm.createTable('categories', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true, unique: true },
  });

  pgm.createTable('books', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    author: { type: 'varchar(255)', notNull: true },
    quantity: { type: 'integer', notNull: true },
    owner_id: { type: 'integer', notNull: true, references: 'users(id)' },
    category_id: { type: 'integer', notNull: true, references: 'categories(id)' },
  });

//  
};

exports.down = (pgm) => {

  pgm.dropTable('books');
  pgm.dropTable('categories');
};
