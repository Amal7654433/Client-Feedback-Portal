import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import errorHandler from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser'
dotenv.config();
connectDB(); // connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],

}));
app.use(logger('dev'));
app.use(express.json());


app.use(cookieParser());
app.use(userRoute)
app.use(adminRoute)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
