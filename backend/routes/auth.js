const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtMiddleware = require('../middleware/middleware.js');
const User = require('../models/user');

router.post('/register', async (req, res) => {
    try {
      const { username, name, email, password } = req.body;
  
      // Check if the username or email is already taken
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Login user and generate JWT token
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      if (!password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = signToken({ userId: user._id });
      res.json({ token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;