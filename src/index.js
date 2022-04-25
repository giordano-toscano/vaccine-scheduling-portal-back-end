// essa API está consumindo localhost na porta 3000
import validationMiddleware from "./middleware/ValidationMiddleware.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import ScheduleRouter from "./router/ScheduleRouter.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3333;

mongoose
    .connect(DATABASE_URL)
    .then(() => {
        console.log("Database connected...");
    })
    .catch((error) => {
        console.error("Error to connect to database: " + error.message);
    });

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(validationMiddleware);
app.use(ScheduleRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
