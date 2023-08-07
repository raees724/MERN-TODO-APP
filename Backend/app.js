import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

import { database } from './database/connection.js';
import todoRouter from './router/todo.js'
import authRouter from './router/auth.js'

const app = express();

//database
database();

//middlewares
app.use(morgan('tiny'));
app.use(cors({origin:true,credentials:true}));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(helmet())
app.use(cookieParser())


app.use('/api/todo',todoRouter);
app.use('/api/auth',authRouter);

app.listen(process.env.PORT || 7000,()=>console.log(`server started on PORT ${process.env.PORT || 7000}`));

