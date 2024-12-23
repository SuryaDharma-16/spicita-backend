import { query } from "../database/db.js";

const getNotes = async(req, res) => {
    try {
        const notes = await query("SELECT * FROM notes");
        return res.status(200).json({msg:"berhasil", data: notes});
    } catch(error) {
        return res.status(500).json({msg: "terjadi kesalahan"});
    }
}

const addNotes = async (req, res) => {
    const {title, datetime, note} = req.body;
    try {
        const data = await query("INSERT INTO notes (title, note) VALUES (?, ?)", [title, note]);

        return res.status(200).json({msg: "Yoshha berhasil"})
    } catch(error) {
        return res.status(400).json({msg: "maaf, sedang puasa"})
    }
}

const getNotesbyId = async (req, res) => {
  // Extract the note ID from the request parameters
  const { id } = req.params;

  try {
    // Query the database to retrieve the note with the given ID
    const result = await query("SELECT * FROM notes WHERE id = ?", [id]);

    // Check if a note with the given ID was found
    if (result.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Extract the note data from the query result
    const note = result[0];

    // Send the retrieved note data as a JSON response
    return res.status(200).json(note);
  } catch (error) {
    // Handle any errors that occur during database operations
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateNotes = async (req, res) => {
  // Extract note ID, title, datetime, and note from request body
  const { id } = req.params;
  const { title, datetime, note } = req.body;

  try {
    // Update the note in the database using the given ID, title, datetime, and note
    await query("UPDATE notes SET title =?, datetime =?, note =? WHERE id =?", [title, datetime, note, id]);

    // Send a success message indicating the note was updated
    return res.status(200).json({ msg: "Note updated successfully" });
  } catch (error) {
    // Handle any errors that occur during database operations
    return res.status(400).json({ msg: "Internal server error" });
  }
};

const deleteNotes = async (req, res) => {
  // Extract the note ID from the request parameters
  const { id } = req.params;

  try {
    // Delete the note from the database using the given ID
    await query("DELETE FROM notes WHERE id = ?", [id]);

    // Send a success message indicating the note was deleted
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during database operations
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {getNotes, addNotes, getNotesbyId, updateNotes, deleteNotes};