const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: {type:String},
    category: { type: String, required: true },
  });
  
  // Create Product Model
//   const Product = mongoose.model('Product', productSchema);

  module.exports = mongoose.model('products', productSchema, 'products');
