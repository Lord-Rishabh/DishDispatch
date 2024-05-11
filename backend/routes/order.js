const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/middleware');
const Order = require('../models/Order');

// Route to get all the orders of a restaurant
router.get('/:restaurantUsername/orders', fetchuser, async (req, res) => { 
  try { 
    const {restaurantUsername} = req.params;
    const orders = await Order.find({restaurantUsername});
    res.json(orders);
  }
  catch(e) { 
    return res.status(500).json({ error: e.message });
  }
}); 

// Route to get a particular order of a restaurant
router.get('/:restaurantUsername/orders/:orderId', fetchuser, async (req,res) => { 
  try { 
    const {restaurantUsername, orderId} = req.params;
    const order = await Order.find({_id : orderId , restaurantUsername});
    if(!order) { 
      return res.status(404).json({msg: 'Order not found'});
    }
    res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
} );

// Route to add a new order
router.post('/:restaurantUsername/orders', async (req,res) => { 
  try {
    const {customerName, phoneNumber, tableNumber, orderItems} = req.body;
    const {restaurantUsername} = req.params;
    const order = new Order({
      restaurantUsername,
      customerName,
      phoneNumber, 
      tableNumber,
      orderItems
    })
    await order.save();
    res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Route to update an order
router.put('/:restaurantUsername/orders/:orderId', fetchuser, async (req,res) => {
  try {
    const {customerName, phoneNumber, tableNumber, orderItems, status} = req.body;
    const {restaurantUsername, orderId} = req.params;
    const newOrder = {restaurantUsername, customerName, phoneNumber, tableNumber, orderItems, status};
    const order = await Order.findOneAndUpdate({_id: orderId, restaurantUsername}, newOrder, {new: true});
    res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Route to update the status of an order to 'completed'
router.put('/:restaurantUsername/orders/:orderId/status', fetchuser, async (req,res) => {
  try {
    const {restaurantUsername, orderId} = req.params;
    const order = await Order.findOneAndUpdate({_id: orderId, restaurantUsername}, {status: true}, {new: true});
    res.json(order);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;