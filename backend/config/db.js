import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const dataBaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('db is connected sucssesfully!!')
    })
    .catch((error)=>{
        console.log(error)
    })
};