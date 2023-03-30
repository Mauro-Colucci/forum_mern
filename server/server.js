import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";

import authRoutes from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: "./config/.env" });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
