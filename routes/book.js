// routes/book.js
import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import upload from '../multerConfig.js';
import {
  addBook,
  getBooksByUser,
  getAllBooks,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/add', authorize, upload.single('coverPhoto'), addBook);
router.get('/user', authorize, getBooksByUser);
router.get('/', getAllBooks);
router.put('/:id', authorize, updateBook);
router.delete('/:id', authorize, deleteBook);

export default router;
