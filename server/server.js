import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import commentsRoutes from "./routes/comments.js";
import communityRoutes from "./routes/community.js";

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
app.use("/api/comments", commentsRoutes);
app.use("/api/community", communityRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
