const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const loginMiddleware = require('../middleware/middleware');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // Check if the username or email is already taken
    const existingEmail = await User.findOne({email});
    const existingUsername = await User.findOne({username});
    
    if (existingEmail || existingUsername) {
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
router.post('/login', loginMiddleware, (req, res) => {
  // If the execution reaches here, it means the user is authenticated
  res.json({ message: 'Login successful', user: req.user });
});

module.exports = router;