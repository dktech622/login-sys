import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import authRoute from './routes/Routes.js'; // Default import

dotenv.config()

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(bodyParser.json())

app.use('/api/auth', authRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
},)


