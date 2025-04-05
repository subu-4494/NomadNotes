const express = require("express");
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/notecontroller");
const authMiddleware = require("../middlewares/authmiddlewares");
const multer = require("multer");
const path = require("path");

// 📷 Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// 🔐 Protected Routes (only logged-in users can access)

router.post("/create", authMiddleware, upload.single("image"), createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
