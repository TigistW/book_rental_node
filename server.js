// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protectedRoutes.js';
import bookRoutes from './routes/book.js';
import categoryRoutes from './routes/category.js';
import rentalRoutes from './routes/rental.js';
import userRoutes from './routes/user.js'; // Add this line
import profileRoutes from './routes/profile.js'; // Add this line

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
