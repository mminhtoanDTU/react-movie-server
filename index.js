import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './configs/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoute from './routers/authRoute.js';
import postRoute from './routers/postsRoute.js';
import userRoute from './routers/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Allow connect client and server
app.use(cors());

//Routers
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/users', userRoute);

//Handle when Error Route
app.all('*', (req, res, next) => {
    const err = new Error("The route can not be found."); //obj
    err.statusCode = 404;
    next(err);
})
app.use(errorHandler);

//Connect to DB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
