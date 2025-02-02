const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Save the new user with hashed password
      const newUser = await User.create({ email, password: await bcrypt.hash(password, 10) });
  
      // Generate JWT token
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token, email: newUser.email });
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, email: user.email });
    } catch {
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports=router;