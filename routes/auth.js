// routes/auth.js
import express from 'express';
import { login, register, register_admin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/register_admin', register_admin);
export default router;
