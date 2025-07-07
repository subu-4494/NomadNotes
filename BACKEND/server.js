import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// load variables from .env
dotenv.config();

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploads

// Routes
import authRoutes from "./routes/authroutes.js";
import noteRoutes from "./routes/noteroutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Serve frontend in production


// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
