import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/create.css'
import axios from 'axios'
import Navbar from './Navbar';

function Create({ saveNote }) {  // Passing saveNote as a prop
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail'); // Get user email from localStorage


  const handleSave = async () => {
    if (note.trim()) {
      try {
        // Save the note to the backend
        await axios.post('http://localhost:5000/api/notes/add', {
          content: note,
          userEmail: userEmail,
        });
        navigate('/'); 
      } catch (error) {
        console.error('Error saving note:', error);
      }

    } else {
      alert("Note cannot be empty!");
    }
  };

  return (
    <div>
<Navbar/>
      <div className="create-note-container">
      
        <h1 className="create-title">Create a New Note</h1>
        <textarea
          className="note-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
        />
        <br />
        <button className="save-button" onClick={handleSave}>
          Save Note
        </button>
      </div>
      </div>
    );
    
}

export default Create;
