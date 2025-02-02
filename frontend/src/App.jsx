import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './components/Home'
import Create from './components/Create'
import Login from './components/Login';
import Register from './components/Register';
import EditNote from './components/EditNote';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

<BrowserRouter>    
<Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/edit" element={<EditNote />} />
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
