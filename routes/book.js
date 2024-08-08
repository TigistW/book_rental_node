// routes/book.js
import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import {
  addBook,
  getBooksByOwner,
  getAllBooks,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/', authorize, addBook);
router.get('/owner', authorize, getBooksByOwner);
router.get('/', getAllBooks);
router.put('/:id', authorize, updateBook);
router.delete('/:id', authorize, deleteBook);

export default router;
