import express from "express";
import dotenv from "dotenv";
import { dataBaseConnection } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import drRoutes from "./routes/drRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/user", userRoutes);
app.use("/api/doctor", drRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  dataBaseConnection();
  console.log(`server is running at port ${port}`);
});
