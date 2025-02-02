import express from 'express';
import cors from 'cors';
import connectDB from './Db.js';
import authRoutes from '../routes/Auth.js';
import dotenv from 'dotenv';
import getintouch from '../routes/GetInTouchRoute.js'
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/message',getintouch)
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
