import express from "express";
import { addNotes, deleteNotes, getNotes, getNotesbyId, updateNotes } from "../controller/notes.js";
const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes", addNotes);
router.get("/notes/:id", getNotesbyId);
router.put("/notes/:id", updateNotes);
router.delete("/notes/:id", deleteNotes);

export default router;