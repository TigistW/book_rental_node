// routes/category.js
import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import {
  addCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', authorize, addCategory);
router.get('/:id', getCategoryById);
router.get('/', getAllCategories);
router.put('/:id', authorize, updateCategory);
router.delete('/:id', authorize, deleteCategory);

export default router;
