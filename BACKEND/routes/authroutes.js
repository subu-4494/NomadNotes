import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";

const router = Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
