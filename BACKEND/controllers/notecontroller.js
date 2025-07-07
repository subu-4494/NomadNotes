import Note from "../models/note.js";

// Create a new note with multiple images
export const createNote = async (req, res) => {
  try {
    const { title, content, topic } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const note = new Note({
      user: req.user.id, // from auth middleware
      title,
      content,
      topic,
      images,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err.message });
  }
};

// Get all notes for logged-in user
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err.message });
  }
};

// Update a note (including images)
export const updateNote = async (req, res) => {
  try {
    const { title, content, topic } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.topic = topic || note.topic;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      note.images = [...note.images, ...newImages];
    }

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
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
