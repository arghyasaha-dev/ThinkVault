const catchAsync = require("../utils/catchAsync.js");

const express = require("express");
const router = express.Router();
const Note = require("../models/note.js");

router.get("/", catchAsync(async (req, res) => {
    const notes = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(notes);
}))
router.get("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        res.status(404).json({ message: "Note not found !" });
    }
    res.status(200).json(note);
}))
router.post("/", catchAsync(async (req, res) => {
    const { title, content } = req.body;
    const newNote = await new Note({ title: title, content: content });
    await newNote.save();
    res.status(201).json(newNote);
}))
router.put("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedNote) {
        return res.status(404).json({ message: "Note not found !" });
    }
    res.status(200).json(updatedNote);
}))
router.delete("/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully !" });
}))

module.exports = router; 