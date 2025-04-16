import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ideaRouter from './api/Ideas.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/ideas', ideaRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 