const express = require("express");
const mongoose = require("mongoose");
//const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config(); // load variables from .env
//connectDB();


const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/notes", require("./routes/noteroutes"));

// Connect MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
