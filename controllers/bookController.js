// controllers/bookController.js
import Book from '../models/book.js';
import BookCategory from '../models/book_category.js';

export const addBook = async (req, res) => {
  const { title, author, quantity, price, categoryName } = req.body;
  const ownerId = req.user.id;
  const coverPhoto = req.file ? req.file.path : null;
  
  try {
    
    let category = await BookCategory.findByName(categoryName);
    if (!category) {
      category = await BookCategory.create({ name: categoryName });
    }

    const book = await Book.create({
      title,
      author,
      quantity,
      price,
      categoryId:category.id,
      ownerId,
      coverPhoto,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksByUser = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const books = await Book.findByOwner(ownerId);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updates = req.body;
  const coverPhoto = req.file ? req.file.path : null;

  if (coverPhoto) {
    updates.coverPhoto = coverPhoto;
  }

  try {
    const book = await Book.updateById(bookId, updates);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.deleteById(bookId);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
