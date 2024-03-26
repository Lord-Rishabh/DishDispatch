const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to create a new order
router.post('/', async (req, res) => {
  const { customerName, phoneNumber, tableNumber, orderItems, price, time } = req.body;

  try {
    // Create a new order object
    const newOrder = new Order({
      customerName,
      phoneNumber,
      tableNumber,
      orderItems,
      price,
      time
    });

    // Save the new order to the database
    const createdOrder = await newOrder.save();

    // Return the newly created order
    res.status(201).json(createdOrder);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
});

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update an order by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;