// middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  jwt.verify(token, process.env.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid Token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
