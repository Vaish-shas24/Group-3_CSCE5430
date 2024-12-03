import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Container, Card } from "react-bootstrap";
import { removeFromCart, updateCartQuantity } from "../redux/actions/cartActions";
import NavbarTop from "./NavbarTop";
import axios from "axios";
import Footer from "./Footer";
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import GoogleMapComponent from "./GoogleMapComponent";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // Use state to track the total amount
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  // Fetch cart items
  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Set loading while fetching data
      const response = await axios.get(
        "https://toy-station-server.onrender.com/api/users/get_cart_items",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const cartData = response.data.cartItems;
      console.log("cartData", cartData);
      if (cartData.length > 0) {
        const items = cartData.map((item) => ({
          ...item,
          price: parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0, // Ensure price is numeric
        }));
        setCartItems(items);
      } else {
        setCartItems([]); // Set empty array if no items
      }
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch cart items");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    // Recalculate total amount whenever cartItems change
    const total = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
    setTotalAmount(total.toFixed(2)); // Update total amount state
  }, [cartItems]);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle Buy Now button click
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    

    if (!token) {
      setError("Please log in to complete the purchase.");
      return;
    }

    // Validate delivery address
    if (!location) {
      setError("Please select a location on the map.");
      return;
    }
    const stripePromise = loadStripe('pk_test_51QKcIFFQuaYsVoVkDIa1bzysWr4MZrPB3RZXVhh7fNQjhfnFCwMBMq1mKchkHZcXwKjxak70drBVAoRNAp3zB4EA00RcBqr2aD');

    const response = await axios.post('https://toy-station-server.onrender.com/api/payment/create-payment-intent', { totalAmount });
    const session = await response;
    console.log('Session:', session);

    try {
      const response = await axios.post(
        "https://toy-station-server.onrender.com/api/users/createOrder", // Your createOrder API endpoint
        {
          products: cartItems,
          total_amount: totalAmount, // Send the total amount state
          delivery_address: location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      if (response.status === 201) {
        // Handle successful order creation
        const result = await stripe.redirectToCheckout({
          sessionId: session.data.id,
        });
        alert("Order created successfully!");
        // Optionally, you can reset the cart or navigate the user to another page
        setCartItems([]);
        setTotalAmount(0);
      } else {
        setError("Failed to create the order.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating order.");
    }
  };

  // Handle quantity change
  const handleQuantityChange = async (id, newQuantity, status) => {
    const token = localStorage.getItem("token");
    const item = cartItems.find((cartItem) => cartItem._id === id);

    if (!item || newQuantity <= 0 || !token) return;

    try {
      await axios.post(
        "https://toy-station-server.onrender.com/api/users/changeCartValue",
        {
          productId: id,
          volume: newQuantity,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems(); // Re-fetch cart items
    } catch (error) {
      console.error(
        "Failed to update quantity:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle remove item
  const handleRemoveFromCart = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://toy-station-server.onrender.com/api/users/deletefromCart",
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCartItems(); // Re-fetch cart items
      } else {
        console.error(
          response.data.message || "Failed to delete item from cart."
        );
      }
    } catch (err) {
      console.error(
        "Error deleting cart item:",
        err.response?.data?.message || err.message
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-image"
                        />
                        <span>{item.productName}</span>
                      </Col>
                      <Col md={3}>
                        <p>{item.productName}</p>
                        <p>{item.price}</p>
                        <b>
                          <p>Items {item.count}</p>
                        </b>
                      </Col>
                      <Col md={3}>
                        <Button
                          onClick={() =>
                            handleQuantityChange(item._id, 1, "decre")
                          }
                          disabled={item.count <= 1}
                        >
                          -
                        </Button>
                        <Button
                          onClick={() =>
                            handleQuantityChange(item._id, 1, "incre")
                          }
                        >
                          +
                        </Button>
                      </Col>
                      <Col md={2}>${(item.price * item.count).toFixed(2)}</Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>Summary</Card.Header>
              <Card.Body>
                <p>Total: ${totalAmount}</p>
                <label htmlFor="location">Location:</label>
                {/* <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                /> */}
                <GoogleMapComponent setLocation={setLocation} />
                <p>Selected Location: {location || "None"}</p>
                <p></p>
                <button
                  onClick={handleBuyNow}
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Buy Now
                </button>
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
