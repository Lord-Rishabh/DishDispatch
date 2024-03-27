const bcrypt = require('bcrypt');
const User = require('../models/user'); // Assuming you have a User model

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
    next();
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginMiddleware;