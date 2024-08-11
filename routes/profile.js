// routes/book.js
import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import upload from '../multerConfig.js';
import {
  addProfile,
  getProfileByUser,
  updateProfile,
  deleteProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.post('/add', upload.single('profilePhoto'), addProfile);
router.get('/my_profile', authorize, getProfileByUser);
router.put('/:id', authorize, updateProfile);
router.delete('/:id', authorize, deleteProfile);

export default router;
