import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import path from "path"
import { fileURLToPath } from "url"
import cors from 'cors';

import UserRouter from "./Routes/userRoutes.route.js";
import ProductRouter from './Routes/product.route.js'

const app = express();

const __file = fileURLToPath(import.meta.url);
const __dir = path.dirname(__file)

mongoose.connect("mongodb://127.0.0.1:27017/Project_11")
    .then(() => {
        console.log("Database connected...");

        app.use(express.json({ limit: '10mb' }));
        app.use(express.static('public'));
        app.use('/uploads', express.static('uploads'));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors({
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        app.use("/user", UserRouter);
        app.use("/product", ProductRouter);

        app.listen(5000, () => {
            console.log("server running on port no. 5000");
        })
    }).catch((error) => {
        console.log("DB not connected...");
        console.log("error : " + error);
    })

