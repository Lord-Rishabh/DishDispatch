const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const dishSchema = new mongoose.Schema({
  dish_id: {
    type: String,
    unique: true, // Ensure uniqueness of dish_id
    required: true,
    default: uuidv4 // Use UUID v4 to generate a unique identifier
  },
  name: {
    type: String,
    required: true,
  },
  restaurantUsername: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Dish model using the schema
const Dish = mongoose.model('Dish', dishSchema);

// Export the Dish model
module.exports = Dish;