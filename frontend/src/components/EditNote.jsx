import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/editnote.css'; 
import Navbar from './Navbar';

function EditNote() {
  const { state: note } = useLocation();
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/notes/update/${note._id}`, {
        content: updatedContent,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div>
        <Navbar/>
    <div className="edit-note-container">
        
      <h1>Edit Note</h1>
      <textarea
        className="note-textarea"
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Note</button>
    </div>
    </div>
  );
}

export default EditNote;
