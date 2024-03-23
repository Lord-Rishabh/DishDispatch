const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');

// Route to add a new dish
router.post('/', async (req, res) => {
  const { name, dish_id, description, category, price, image_url } = req.body;

  try {

    const count = await Dish.countDocuments();
    const dishId = count + 1;
    // Create a new dish object
    const newDish = new Dish({
      name,
      dish_id: dishId,
      description,
      category,
      price,
      image_url
    });

    // Save the new dish to the database
    const createdDish = await newDish.save();

    // Return the newly created dish
    res.status(201).json(createdDish);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
});

// Route to get all dishes
router.get('/', async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Route to get a single dish by ID
  router.get('/:id', async (req, res) => {
    try {
      const dish = await Dish.findById(req.params.id);
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
      res.json(dish);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  // Delete the dish
  router.delete('/:id', async (req, res) => {
    const dishId = req.params.id;
  
    try {
      // Find the dish by ID
      const dish = await Dish.findById(dishId);
  
      // If the dish doesn't exist, return a 404 response
      if (!dish) {
        return res.status(404).json({ message: 'Dish not found' });
      }
  
      // If the dish exists, remove it from the database
      await Dish.findByIdAndDelete(dishId);
  
      // Return a success message
      res.json({ message: 'Dish removed successfully' });
    } catch (err) {
      // Handle errors
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router;
