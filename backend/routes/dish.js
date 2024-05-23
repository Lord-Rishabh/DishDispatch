const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const fetchuser = require('../middleware/middleware');

// Route to get all dishes from a particular restaurantUsername
router.get('/:restaurantUsername/dishes', async (req, res) => {
  try {
    const { restaurantUsername } = req.params;
    const dishes = await Dish.find({ restaurantUsername });
    res.json(dishes);
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    res.status(500).send('Server Error');
  }
});

// Route to get a particular dish of a restaurant
router.get('/:restaurantUsername/dishes/:dishId', async (req, res) => {
  try {
    const { restaurantUsername, dishId } = req.params;
    const dish = await Dish.find({ _id: dishId, restaurantUsername });
    if (!dish) {
      return res.status(404).json({ msg: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    console.error('Error retrieving dish:', error);
    res.status(500).send('Server Error');
  }
});

// Route to post a new dish to a particular restaurant
router.post('/:restaurantUsername/dishes', fetchuser , async (req, res) => {
  try {
    const { name, description, category, price, image_url } = req.body;
    const { restaurantUsername } = req.params;
    const dish = new Dish({
      name,
      restaurantUsername,
      description,
      category,
      price,
      image_url
    });
    await dish.save();
    res.json(dish);
  } catch (error) {
    console.error('Error adding dish:', error);
    res.status(500).send('Server Error');
  }
});

// Route to update a dish of a particular restaurant
router.put('/:restaurantUsername/dishes/:dishId', fetchuser , async (req, res) => {
  try {
    const { name, description, category, price, image_url } = req.body;
    
    if(!name || !description || !category || !price)
      return res.status(404).json({ msg: 'Please fill all the details' });
    
    const { restaurantUsername, dishId } = req.params;
    let dish = await Dish.findOneAndUpdate(
      { _id: dishId, restaurantUsername },
      { name, description, category, price, image_url },
      { new: true }
    );
    if (!dish) {
      return res.status(404).json({ msg: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).send('Server Error');
  }
});

// Route to delete a dish of a particular restaurant
router.delete('/:restaurantUsername/dishes/:dishId', fetchuser , async (req, res) => {
  try {
    const { restaurantUsername, dishId } = req.params;
    const dish = await Dish.findOneAndDelete({ _id: dishId, restaurantUsername });
    if (!dish) {
      return res.status(404).json({ msg: 'Dish not found' });
    }
    res.json({ msg: 'Dish deleted successfully' });
  } catch (error) {
    console.error('Error deleting dish:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;