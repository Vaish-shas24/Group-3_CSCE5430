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

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/all-orders" element={<AllOrders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/help-support" element={<HelpSupport />} />
      </Routes>
    </div>
  </Router>
  </Provider>
  );
}

export default App;

