import express from "express";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import { setRequestId } from "./middleware/request";  // Middleware for setting request ID

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());

app.use(setRequestId);

app.use("/users", userRouter);
app.use("/posts", postRouter);

export default app;
