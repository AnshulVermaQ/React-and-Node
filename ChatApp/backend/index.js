import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import {connectDB} from './database/db.js';

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);


app.listen(port,(req,res) =>{
    console.log(`Server is running on port ${port}`);

})

