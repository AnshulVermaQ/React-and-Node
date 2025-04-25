import express from 'express';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';
import {connectDB} from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

const port =  3000;

dotenv.config();
connectDB();
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);
app.use('/api/auth', messageRoutes);


app.listen(port,(req,res) =>{
    console.log(`Server is running on port ${port}`);

})

