import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AllOrders from './components/AllOrders';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import HelpSupport from './components/HelpSupport';
import AboutUs from './components/AoutUs';
import ContactUs from './components/ContactUs';
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QKcIFFQuaYsVoVkDIa1bzysWr4MZrPB3RZXVhh7fNQjhfnFCwMBMq1mKchkHZcXwKjxak70drBVAoRNAp3zB4EA00RcBqr2aD');


function App() {
  return (
    <Provider store={store}>
    <Router>
    <Elements stripe={stripePromise}>
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/AboutUS" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </div>
    </Elements>

  </Router>
  </Provider>
  );
}

export default App;
