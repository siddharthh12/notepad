import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] =useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/api/login', {email, password});
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userEmail', response.data.email); 
      navigate('/');     
    } catch(error){
      console.log('login error', error)
      alert('Invalid username or password')
      }
    }
  
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
