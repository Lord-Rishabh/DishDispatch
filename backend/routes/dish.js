// dishRoutes.js
const express = require('express');
const router = express.Router();
const Dish = require('./dish'); // Import the Dish model/schema
const authenticateJWT = require('../middleware/middleware.js'); // Import the middleware

// Route to create a new dish
router.post('/dishes', authenticateJWT, async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    await newDish.save();
    res.status(201).json(newDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all dishes
router.get('/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update a dish by ID
router.put('/dishes/:id', authenticateJWT, async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(updatedDish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a dish by ID
router.delete('/dishes/:id', authenticateJWT, async (req, res) => {
  try {
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (!deletedDish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
