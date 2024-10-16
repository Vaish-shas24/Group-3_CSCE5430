const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/create', async (req, res) => {
  const { user, orderItems, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      user,
      orderItems,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

// Get all orders for a user
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ user: email }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

module.exports = router;
