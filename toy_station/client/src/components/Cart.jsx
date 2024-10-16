import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, ListGroup, Container, Card } from 'react-bootstrap';
import { removeFromCart, updateCartQuantity, clearCart } from '../redux/actions/cartActions';
import NavbarTop from './NavbarTop';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartQuantity(id, quantity));
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = async () => {
    const userEmail = localStorage.getItem('email');
  
    if (!userEmail) {
      alert('Please log in to place an order.');
      return;
    }
  
    try {
      const orderData = {
        user: userEmail,
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: (item.price * item.quantity),
        })),
        totalAmount: totalAmount,
      };
  
      await axios.post('/api/orders/create', orderData); // Ensure this URL is correct
      dispatch(clearCart()); // Clear the cart after order is placed
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <NavbarTop />
      <Container className="my-4">
        <Row>
          <Col md={8}>
            <h2>Your Cart</h2>
            <ListGroup variant="flush">
              {cartItems.length === 0 ? (
                <ListGroup.Item>Your cart is empty</ListGroup.Item>
              ) : (
                cartItems.map((item) => {
                  const itemTotal = (item.price * item.quantity).toFixed(2);
                  return (
                    <ListGroup.Item key={item.id}>
                      <Row className="align-items-center">
                        <Col md={4} className="d-flex align-items-center">
                          <img src={item.image} alt={item.name} className="cart-image" />
                          <span className="ms-2">{item.name}</span>
                        </Col>
                        <Col md={4} className="d-flex align-items-center">
                          <Button
                            variant="danger"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="success"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </Col>
                        <Col md={2}>${item.price.toFixed(2)}</Col>
                        <Col md={2}>${itemTotal}</Col>
                        <Col md={2}>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="mt-4">
              <Card.Header as="h5">Cart Summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Total Amount:</strong> ${totalAmount}
                </Card.Text>
                <Button variant="primary" className="w-100" onClick={handlePlaceOrder}>
                  Place order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
