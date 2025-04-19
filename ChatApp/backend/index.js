import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authRoutes);


app.listen(port,(req,res) =>{
    console.log(`Server is running on port ${port}`);

})

