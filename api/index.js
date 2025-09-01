import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Taskrouter from './routes/Task.route.js'

import path from "path";
import { fileURLToPath } from "url";

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))

app.use(express.json())

//routes

app.use('/api/task', Taskrouter)

//serve frontend build (AFTER API routes)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// use "dist" for Vite build, change to "build" if using CRA
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});


mongoose.connect(process.env.MONGODB_CONN).then(() => {
    console.log('Databse connected')
}).catch(err => console.log('Database connection failed.',err))


app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT)
})
