const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.jwt_secret;
const User = require('../models/user'); 


// Middleware function to handle login
const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password with hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // If password matches, set user information in request object and proceed
    req.user = user;
    // Create a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username, name: user.name, email: user.email }, secretKey);
    res.json({token})
    console.log('Token:', token);
    next();
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginMiddleware;