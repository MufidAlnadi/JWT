import express from 'express';
import http from 'http';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import comperssion from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/config';
import router from 'router';


const app = express();
app.use(cors({
    credentials:true,

}))

app.use(comperssion());
app.use(cookieParser());
app.use(bodyParser.json());


mongoose.Promise = Promise;

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('connected');
    })
    .catch((error: any) => {
        console.log(error);
    });

    app.use('/',router());

