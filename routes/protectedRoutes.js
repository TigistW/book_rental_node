// routes/protectedRoute.js
import express from 'express';
import { authorize } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/protected', authorize, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
