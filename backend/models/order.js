const mongoose = require('mongoose');

// Define the schema for an order
const orderSchema = new mongoose.Schema({
  restaurantUsername: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  orderItems: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  time: {
    type: Date,
    default: Date.now,
  },
  status : {
    type: Boolean, 
    default: false
  },
});

// Create the Order model using the schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
