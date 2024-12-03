const User = require('../models/userModel');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Delivered = require('../models/delivered');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Import mongoose

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("username", username, "email", email)
  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// login a new user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login API called");

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials, please enter valid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials, please enter valid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, '123456', { expiresIn: '1h' });
    console.log("token", token)
    await User.updateOne(
      { email }, // Filter to find the user by email
      { $set: { token } } // Set the token field
    );
    // If successful, return a success message
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Create API to Insert Product
const createProduct = async (req, res) => {
  try {
    const { product_name, description, price, image, category } = req.body;
    const rating = ""
    // Validate required fields
    if (!product_name || !description || !price || !image || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the product
    const product = new Product({
      product_name,
      description,
      price,
      image,
      rating,
      category,
    });
    await product.save();

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Fetch all products
const getProducts = async (req, res) => {
  try {
    // Access the 'products' collection directly
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    // console.log("products", products)
    res.status(200).json({ message: 'Products fetched successfully', products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// add product to cart
const addToCart = async (req, res) => {
  const { productId } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; 
  // Validate required fields
  console.log("token", token)
  const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
  const userId = decoded.userId; // Extract userId from the decoded token
  console.log("userId", userId)
  console.log("userId", userId, "productId", productId)
  if (!userId || !productId) {
    return res.status(400).json({ message: 'UserId and ProductId are required' });
  }

  try {
    
    // Check if the product exists in the 'products' collection
    const product = await mongoose.connection.db.collection('products').findOne({ _id: new mongoose.Types.ObjectId(productId) });
    console.log("product", product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      console.log("already exists")
      return res.status(400).json({ message: 'Item already added to cart' });
    }

    // Add the product to the cart using the Cart model
    const cartItem = new Cart({
      userId,
      productId,
      productName: product.product_name,
      price: product.price,
      image: product.image,
      count:1
    });

    await cartItem.save();
    console.log("saved to cart")
    res.status(201).json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//delete from cart
const deletefromCart = async (req, res) => {
  const { productId } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; 

  console.log("calling delete cart API");
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
    const userId = decoded.userId; // Extract userId from the decoded token
    console.log("userId", userId, "_id", productId);

    if (!userId || !productId) {
      return res.status(400).json({ message: 'UserId and ProductId are required' });
    }

    // Check if the product is already in the user's cart
    const CartItem = await Cart.deleteOne({ userId, _id: productId });
    if (CartItem.deletedCount > 0) {
      console.log('Cart item deleted successfully');
      return res.status(200).json({ message: 'Cart item deleted successfully' });
    } else {
      console.log('No cart item found to delete');
      return res.status(404).json({ message: 'No cart item found to delete' });
    }
  } catch (error) {
    console.error("Error while deleting cart item:", error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


//increase count of cart item count
const increase_decreaseCount = async (req, res) => {
  const { productId, volume, status } = req.body;
  console.log("productId", productId, "volume", volume, "status", status)
  const token = req.headers.authorization?.split(' ')[1];
  console.log("calling increase_decrement api")
  try {
    const decoded = jwt.verify(token, '123456'); // Replace with your JWT secret
    const userId = decoded.userId;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'UserId and ProductId are required' });
    }
    let _id = productId
    console.log("_id", _id, "volume", volume, "userId", userId)
    // Find the cart item
    const existingCartItem = await Cart.findOne({ userId, _id });

    if (!existingCartItem) {
      console.log("product not found in cart")
      return res.status(404).json({ message: 'Cart item not found' });
    }

    let updatedCount = 0
    // Update the count
    if(status === "incre"){
      console.log("increasing count")
      updatedCount = existingCartItem.count + volume;
      console.log("increasing count", updatedCount)
    }else{
      console.log("decresing count")
      updatedCount = existingCartItem.count - volume;
      console.log("decresing count", updatedCount)
    }
    // const updatedCount = existingCartItem.count + volume;
    console.log("updatedCount", updatedCount)
    if (updatedCount <= 0) {
      await Cart.deleteOne({ userId, _id }); // Remove item if count is 0
      return res.status(200).json({ message: 'Item removed from the cart' });
    }

    await Cart.updateOne(
      { userId, _id },
      { $set: { count: updatedCount } }
    );
    console.log("cart count updated")
    res.status(200).json({ message: 'Item count updated in the cart', updatedCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//increase count of cart item count by products
const increase_decreaseCountproduct = async (req, res) => {
  const { productId, volume, status } = req.body;
  console.log("productId", productId, "volume", volume, "status", status)
  const token = req.headers.authorization?.split(' ')[1];
  console.log("calling increase_decreaseCountproduct api")
  try {
    const decoded = jwt.verify(token, '123456'); // Replace with your JWT secret
    const userId = decoded.userId;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'UserId and ProductId are required' });
    }
    // let _id = productId
    console.log("productId", productId, "volume", volume, "userId", userId)
    // Find the cart item
    const existingCartItem = await Cart.findOne({ userId, productId });

    if (!existingCartItem) {
      console.log("product not found in cart")
      return res.status(404).json({ message: 'Cart item not found' });
    }

    let updatedCount = 0
    // Update the count
    if(status === "incre"){
      console.log("increasing count")
      updatedCount = existingCartItem.count + volume;
      console.log("increasing count", updatedCount)
    }else{
      console.log("decresing count")
      updatedCount = existingCartItem.count - volume;
      console.log("decresing count", updatedCount)
    }
    // const updatedCount = existingCartItem.count + volume;
    console.log("updatedCount", updatedCount)
    if (updatedCount <= 0) {
      await Cart.deleteOne({ userId, productId }); // Remove item if count is 0
      return res.status(200).json({ message: 'Item removed from the cart' });
    }

    await Cart.updateOne(
      { userId, productId },
      { $set: { count: updatedCount } }
    );
    console.log("cart count updated")
    res.status(200).json({ message: 'Item count updated in the cart', updatedCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all items in the cart for a specific user
const getCartItems = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
  const userId = decoded.userId; // Extract userId from the decoded token
  console.log("userId", userId) // Get userId from URL params
  console.log("getcart itms called")
  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find all cart items for the user in the Cart collection
    const cartItems = await Cart.find({ userId });
    console.log("cartitems:",cartItems)
    // if (cartItems.length === 0) {
    //   return res.status(404).json({ message: 'No items found in the cart', cartItems });
    // }

    res.status(200).json({ message: 'Cart items fetched successfully', cartItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const createOrder = async (req, res) => {
  try {
    const { products, total_amount, delivery_status, delivery_address } = req.body;
    console.log("calling create order")
    const token = req.headers.authorization?.split(" ")[1]; 
    // Validate required fields
    console.log("token", token)
    const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
    const userId = decoded.userId; // Extract userId from the decoded token
    console.log("userId", userId)
    console.log("products",products,"total_amount", total_amount, delivery_status, "delivery_address",delivery_address )
    // Validate required fields
    if (!products || products.length === 0 || !total_amount || !delivery_address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save the order
    const orderCollection = mongoose.connection.db.collection('orders');
    const newOrder = {
      userId,
      products,
      total_amount,
      delivery_status: delivery_status || 'Pending',
      delivery_address,
      order_date: new Date(),
    };

    // Insert the new order into the collection
    const result = await orderCollection.insertOne(newOrder);
    console.log("result", result)
    res.status(201).json({ message: 'Order created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// const delivered = async (req, res) => {
//   const { productId } = req.body;
//   const token = req.headers.authorization?.split(" ")[1]; 
//   // Validate required fields
//   const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
//   const userId = decoded.userId; // Extract userId from the decoded token
//   console.log("userId", userId)
//   console.log("userId", userId, "productId", productId)
//   if (!userId || !productId) {
//     return res.status(400).json({ message: 'UserId and ProductId are required' });
//   }

//   try {
    
//     // Check if the product exists in the 'products' collection
//     const product = await mongoose.connection.db.collection('products').findOne({ _id: new mongoose.Types.ObjectId(productId) });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const result = await Cart.deleteOne({ userId });

//     if (result.deletedCount > 0) {
//       console.log('Cart item deleted successfully');
//       res.status(200).json({ message: 'Cart item deleted successfully' });
//     } else {
//       console.log('No cart item found to delete');
//       res.status(404).json({ message: 'No cart item found to delete' });
//     }
//     // Check if the product is already in the user's cart
//     const existingDeliveredItem = await Delivered.findOne({ userId, productId });

//     if (existingDeliveredItem) {
//       return res.status(400).json({ message: 'Item already added to Delivered' });
//     }

//     // Add the product to the cart using the Cart model
//     const DeliveredItem = new Delivered({
//       userId,
//       productId,
//       productName: product.product_name,
//       price: product.price,
//       count:1
//     });

//     await DeliveredItem.save();

//     res.status(201).json({ message: 'Product added to Delivered', DeliveredItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const getDeliveredItems = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
  const userId = decoded.userId; // Extract userId from the decoded token
  console.log("userId", userId) // Get userId from URL params
  console.log("delivered itms called")
  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Find all cart items for the user in the Cart collection
    const DeliveredItems = await Delivered.find({ userId });
    console.log("Delivereditems:",DeliveredItems)
    if (DeliveredItems.length === 0) {
      return res.status(404).json({ message: 'No items found in the Delivered' });
    }

    res.status(200).json({ message: 'Cart items fetched successfully', DeliveredItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getUserOrders = async (req, res) => {
  // const { userId } = req.body; 
  console.log("calling getUserOrders")
  const token = req.headers.authorization?.split(" ")[1]; 
  const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
  const userId = decoded.userId; // Extract userId from the decoded token
  console.log("userId", userId)

  console.log("getUserOrders called for userId:", userId);

  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch all orders associated with the userId from the 'orders' collection
    const orders = await mongoose.connection.db.collection('orders').find({ userId }).toArray();

    console.log("Fetched orders:", orders);

// If no orders are found, return a 404 response
if (orders.length === 0) {
  return res.status(404).json({ message: 'No orders found for this user' });
}

// Fetch product details for each order
const enrichedOrders = await Promise.all(
  orders.map(async (order) => {
    const product = await mongoose.connection.db
      .collection('products')
      .findOne({ _id: new mongoose.Types.ObjectId(order.productId) }); // Use 'new' here

    // Merge product details into the order
    return {
      ...order,
      product_name: product?.product_name || 'Unknown',
      description: product?.description || 'No description available',
      price: product?.price || 'N/A',
      image: product?.image || 'No image available',
    };
  })
);

console.log("Enriched orders:", enrichedOrders);

// Return the enriched orders
res.status(200).json({ message: 'Orders fetched successfully', orders: enrichedOrders });
} catch (error) {
console.error("Error fetching orders:", error.message);
res.status(500).json({ message: 'Server error', error: error.message });
}
};


// API to get all orders for a specific user
const UserOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    // Validate required fields
    console.log("token", token)
    const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
    const userId = decoded.userId; // Extract userId from the decoded token
    console.log("userId", userId)
    // Access the 'orders' collection directly
    const orderCollection = mongoose.connection.db.collection('orders');
    
    // Find orders for the given userId
    const userOrders = await orderCollection.find({ userId: userId }).toArray();
    
    
    // Return the user's orders
    res.status(200).json({ message: 'Orders fetched successfully', orders: userOrders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const UpdateOrder = async (req, res) => {
  try {
    const { _id, delivery_status } = req.body; // Accept delivery_status in the request body
    const token = req.headers.authorization?.split(" ")[1];

    console.log("_id:", _id, "delivery_status:", delivery_status, "token:", token);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const decoded = jwt.verify(token, '123456'); // Replace '123456' with your JWT secret key
    const userId = decoded.userId; // Extract userId from the decoded token

    const orderCollection = mongoose.connection.db.collection('orders');

    // Update the delivery_status for the specific order
    const updatedOrder = await orderCollection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id), userId }, // Use 'new' for ObjectId
      { $set: { delivery_status } }, // Update operation
      { returnDocument: 'after' } // Return the updated document
    );

    console.log("db updated");
    // console.log("updatedOrder:", updatedOrder);

    

    // Find all orders for the user
    const userOrders = await orderCollection.find({ userId }).toArray();

    res.status(200).json({ message: 'Order updated successfully', orders: userOrders });
  } catch (error) {
    console.error("Error in UpdateOrder:", error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = { registerUser, loginUser ,createProduct, createOrder, UserOrder, UpdateOrder, getProducts,addToCart,getCartItems,getUserOrders, increase_decreaseCount, getDeliveredItems, deletefromCart, increase_decreaseCountproduct};
