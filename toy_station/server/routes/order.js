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

// Return order
router.post('/return', async (req, res) => {
  const { orderId, itemId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const item = order.orderItems.find(item => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in order' });
    }

    item.returned = true;

    await order.save();

    res.status(200).json({ message: 'Item returned successfully' });
  } catch (error) {
    console.error('Error returning item:', error);
    res.status(500).json({ message: 'Failed to return item', error });
  }
});

module.exports = router;
