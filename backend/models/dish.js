const mongoose = require('mongoose');

// Define the schema for a dish
const dishSchema = new mongoose.Schema({
  name: {
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
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
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

const moongose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
  
const Dish = mongoose.model('Dish', dishSchema);  
module.exports = Dish;