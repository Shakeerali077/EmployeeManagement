import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
dotenv.config();

const app = express();

connectDB();

// Get the directory name from the file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(process.env.USER_NAME, process.env.PASSWORD);
// Middleware and routes
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', employeeRoutes);


// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import crypto from 'crypto';
// const JWT_SECRET = crypto.randomBytes(64).toString('hex');
// console.log(JWT_SECRET);





