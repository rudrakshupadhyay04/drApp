import express from "express";
import dotenv from 'dotenv';
import { dataBaseConnection } from "./config/db.js";

dotenv.config();


const app = express();

app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
    dataBaseConnection();
    console.log(`server is running at port ${port}`);
})
