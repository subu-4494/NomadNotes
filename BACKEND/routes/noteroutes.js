import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/notecontroller.js";
import authMiddleware from "../middlewares/authmiddlewares.js";

const router = Router();

// 📷 Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});

const upload = multer({ storage });

//  Protected Routes (only logged-in users can access)
// Now accepts multiple images, max 5 files per upload
router.post("/create", authMiddleware, upload.array("images", 5), createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, upload.array("images", 5), updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
