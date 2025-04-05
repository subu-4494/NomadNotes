const express = require("express");
const { registerUser, loginUser } = require("../controllers/authcontroller");
const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
