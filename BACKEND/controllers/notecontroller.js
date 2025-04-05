const Note = require("../models/note");

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, topic } = req.body;
    const image = req.file ? req.file.filename : ""; // multer handles file

    const note = new Note({
      user: req.user.id, // from auth middleware
      title,
      content,
      topic,
      image,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err.message });
  }
};

// Get all notes for logged-in user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { title, content, topic } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.topic = topic || note.topic;

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
