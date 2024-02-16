// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const connectToMongo = require('./db');

connectToMongo();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});