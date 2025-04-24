import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import connectDB from './config/db.js';

dotenv.config();
connectDB(); // connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
