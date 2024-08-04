// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protectedRoute.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
