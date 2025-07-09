import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load .env variables
dotenv.config();

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://travelwithnomad.vercel.app", // your frontend deployed on Vercel
  "http://localhost:3000"              // local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Middlewares
app.use(express.json()); // parse JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploads if needed

// Routes
import authRoutes from "./routes/authroutes.js";
import noteRoutes from "./routes/noteroutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// (optional) Serve frontend if you ever want to serve React from here
// const frontendPath = path.join(__dirname, "../frontend/build");
// app.use(express.static(frontendPath));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// MongoDB connection & start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });
