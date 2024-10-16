const mongoose = require('mongoose');

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  // The user who placed the order, stored as a string (e.g., email)
  user: {
    type: String,
    required: true, // This field is mandatory
  },
  // Array of items in the order, with each item having name, quantity, price, and total
  orderItems: [
    {
      name: { type: String, required: true }, // Name of the item
      quantity: { type: Number, required: true }, // Quantity of the item
      price: { type: Number, required: true }, // Price per item
      total: { type: Number, required: true }, // Total cost for this item (quantity * price)
    }
  ],
  // Total amount for the entire order
  totalAmount: {
    type: Number,
    required: true, // This field is mandatory
  },
  // Timestamp for when the order was created, with default set to current date/time
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create the Order model using the orderSchema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model for use in other parts of the application
module.exports = Order;

