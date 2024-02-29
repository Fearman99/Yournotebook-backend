const express = require("express");
const router = express.Router();
const Notes = require("../models//Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route.1 fetch user details
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Route.2 add notes
router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter atlest 3 words").isLength({ min: 3 }),
    body("description", "Enter at least 3 words").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(note);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);


//update notes

router.put(
    "/updatenotes/:id",
    fetchUser,
    async (req, res) => {
      const {title,description,tag}=req.body
      const newNote ={}
      if(title){newNote.title = title};
      if(tag){newNote.tag = tag};
      if(description){newNote.description = description};

      //find note to be updated
      let note = await Notes.findById(req.params.id);
      if(!note){return res.status(404).send("not found")}

      if(note.user.toString() !== req.user.id){
        return res.status(401).send("not allowed")
      }

      note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new:true})
      res.json({note})
    }
);


// delete notes

router.delete(
  "/deletenotes/:id",
  fetchUser,
  async (req, res) => {
    //find note to be deleted
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("not found")}

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" :"Note Deleted"})
  }
);

router.put(
  "/pin/:id",
  fetchUser,
  async (req, res) => {
    try {
      const noteId = req.params.id;
      const { pinned } = req.body;

      // Find the note to be updated
      let note = await Notes.findById(noteId);
      if (!note) {
        return res.status(404).send("Note not found");
      }

      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      // Update the pinned status
      note.pinned = pinned;
      await note.save();

      res.json({ success: true, pinned: note.pinned });
    } catch (error) {
      console.error("Error updating pinned status:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route to fetch pinned notes
router.get("/fetchpinnednotes", fetchUser, async (req, res) => {
  try {
    const pinnedNotes = await Notes.find({ user: req.user.id, pinned: true });
    res.json(pinnedNotes);
  } catch (error) {
    console.error("Error fetching pinned notes:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;