import express from "express";
import dotenv from 'dotenv';
import { dataBaseConnection } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const port = process.env.PORT;
app.listen(port, () => {
    dataBaseConnection();
    console.log(`server is running at port ${port}`);
})

app.use('/api/user',userRoutes);