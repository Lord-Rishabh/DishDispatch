const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const loginMiddleware = require('../middleware/loginMiddleware');
const User = require('../models/user');
const JWT_SECRET = process.env.jwt_secret;
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    // Check if the username or email is already taken
    const existingEmail = await User.findOne({email});
    const existingUsername = await User.findOne({username});
    
    if (existingEmail ) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if(existingUsername){
      return res.status(400).json({ message: 'Username already exists' });
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
    console.log('User registered successfully');
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
  console.log('Login successful');
});

router.get('/userDetails', async (req, res) => {
  const token = req.header('auth-token');
  if (!token) {
      return res.status(401).send({ error: "No token provided" });
  }

  try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      return res.json(data);
  } catch (error) {
      console.error('Token Verification Error:', error);
      return res.status(401).send({ error: "Please authenticate using a correct token" });
  }
});

module.exports = router;