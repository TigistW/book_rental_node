import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';
import {
  createRental,
  getRentalById,
  getAllRentals,
  updateRental,
  deleteRental,
} from '../controllers/rentalController.js';

const router = express.Router();

router.post('/', authorize, createRental);
router.get('/:id', authorize, getRentalById);
router.get('/', authorize, getAllRentals);
router.put('/:id', authorize, updateRental);
router.delete('/:id', authorize, deleteRental);

export default router;
