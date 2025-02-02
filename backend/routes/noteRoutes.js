const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

//to save a note
router.post('/add', async(req,res)=>{

    try{
        const {content, userEmail} =req.body;

        const newNote = new Note({
            content,
            userEmail
        })

        await newNote.save();
        res.status(201).json({message: 'Note saved successfully'});
    } catch(error){
        res.status(500).json({error: "Failed to save note"})
    }
})

//to get a note
router.get('/all', async(req, res)=>{
    try{
        const {userEmail}=req.query;

        const notes =await Note.find({userEmail});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({error: 'Failed to retrieve a note'})
    }
});

// Update a note
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      );
      if (!updatedNote) return res.status(404).json({ error: "Note not found" });
      res.status(200).json({ message: 'Note updated successfully', updatedNote });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update note' });
    }
  });

  // Delete a note
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) return res.status(404).json({ error: "Note not found" });
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete note' });
    }
  });
  

module.exports =router;