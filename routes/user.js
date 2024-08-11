import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUsersByRole,
} from '../controllers/userController.js';

const router = express.Router();

// Middleware to ensure only admins can access these routes
const adminAuthorize = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

router.post('/', authorize, adminAuthorize, createUser);
router.get('/:id', authorize, adminAuthorize, getUserById);
router.get('/', authorize, adminAuthorize, getAllUsers);
router.put('/:id', authorize, adminAuthorize, updateUser);
router.delete('/:id', authorize, adminAuthorize, deleteUser);
router.get('/role/:role', authorize, adminAuthorize, getUsersByRole);

export default router;
