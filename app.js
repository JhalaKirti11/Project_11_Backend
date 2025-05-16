import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import path from "path"
import { fileURLToPath } from "url"
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import UserRouter from "./Routes/userRoutes.route.js";
import ProductRouter from './Routes/product.route.js';
import chatRouter from "./Routes/chat-router.js"

const app = express();
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
// app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const __file = fileURLToPath(import.meta.url);
const __dir = path.dirname(__file)


mongoose.connect("mongodb://127.0.0.1:27017/Project_11")
    .then(() => {
        console.log("Database connected...");

        io.on('connection', (socket) => {
            console.log("User Connected", socket.id);

            socket.on('disconnection', () => {
                console.log("User Disconnected", socket.id);
            })
            socket.on('user-message', (data) => {
                console.log("read user-message : " + data.message);
                socket.broadcast.emit('receive_message', data)

                // io.emit('message', data.message);
            })
        })

        app.use("/user", UserRouter);
        app.use("/product", ProductRouter);
        app.use('/chat', chatRouter);

        server.listen(5000, () => {
            console.log("server running on port no. 5000");
        })
    }).catch((error) => {
        console.log("DB not connected...");
        console.log("error : " + error);
    })

