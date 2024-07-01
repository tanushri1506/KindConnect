import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/postRoute.js";
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import userInfoRoutes from './routes/userInfo.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

app.post('/',(req,res)=>{
    res.json('');
});

mongoose.connect(URL).then(()=>{
    console.log("DB connected successfully");
}).catch(error=>console.log(error));

app.use("/api",route);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/userInfo",userInfoRoutes)

app.listen(PORT,()=>{
    console.log(`Server is listening on port : ${PORT}`);
})

