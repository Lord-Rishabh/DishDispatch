// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const connectToMongo = require('./db');
connectToMongo();
const PORT = 3000;
app.use(express.json());
const authRoutes = require('./routes/auth');
const cors = require('cors')

app.use('/auth', authRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Homepage')
})

app.get('/register', (req, res) => {
  res.send('Register')
})

app.get('/login', (req, res) => {
  res.send('Login')
})

//Available Routes 
app.use('/api/dish', require('./routes/dish'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/order', require('./routes/order'));

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});