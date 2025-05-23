import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route'
import cors from 'cors'
import { dbConnection } from './db';
import path from 'path';

dotenv.config();

const app = express();
dbConnection();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
)
app.use('/uploads', express.static(path.join(__dirname, './public/uploads')));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
