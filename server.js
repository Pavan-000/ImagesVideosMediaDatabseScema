require('dotenv').config();
import express from 'express';
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes'
import fileRoutes from './routes/fileRoutes';
import {authMiddleware } from "./middlewares/authMiddleware"

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('api/files', authMiddleware, fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at PORT ${PORT}`)
})