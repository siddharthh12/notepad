import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes/all', {
          params: { userEmail },
        });
        setNotes(response.data); 
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (userEmail) {
      fetchNotes(); 
    }
  }, [userEmail]);

  const handleEdit = (note) => {
    navigate('/edit', { state: note });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/delete/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
            <Navbar />

    <div className="home-container">
      <div className="content">
        <h2 className="header-title">Notepad App</h2>
        <Link to="/create">
          <button className="create-btn">Create note</button>
        </Link>

        <h2 className="your-notes-title">Your notes</h2>
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note._id} className="note-item">
              <p>{note.content}</p>
              <div className="note-buttons">
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default Home;
