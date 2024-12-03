const express = require('express');
const router = express.Router();
const { registerUser, loginUser , getProducts, createProduct, createOrder, UserOrder, UpdateOrder, addToCart,getCartItems,getUserOrders, increase_decreaseCount, getDeliveredItems, deletefromCart, increase_decreaseCountproduct} = require('../controllers/userController');


// POST /api/users/register
router.post('/register', registerUser);

// Login an existing user
router.post('/login', loginUser);

router.post('/createProduct', createProduct)
// GET /api/products - Fetch all products 
router.get('/getproducts', getProducts);


// POST /api/users/add
router.post('/add_to_cart', addToCart);

router.post("/changeCartValue", increase_decreaseCount)

router.post("/increase_decreaseCountproduct", increase_decreaseCountproduct)

// Route to fetch all cart items for a user
router.get('/get_cart_items', getCartItems);

// Fetch all orders for a specific user
router.get('/get_user_orders', getUserOrders);

router.post('/createOrder', createOrder)
// router.post('/delivered', delivered);

router.get('/getDeliveredItems', getDeliveredItems);

router.get('/UserOrder', UserOrder);

router.post('/UpdateOrder', UpdateOrder)

router.post('/deletefromCart',deletefromCart)

module.exports = router;




