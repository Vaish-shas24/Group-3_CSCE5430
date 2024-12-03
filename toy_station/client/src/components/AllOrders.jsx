import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import NavbarTop from './NavbarTop';
import Footer from './Footer';

const AllOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://toy-station-server.onrender.com/api/users/UserOrder`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        console.log("response.data.orders", response.data.orders);
        setOrderData(response.data.orders || []); // Ensure it's always an array
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        setOrderData([]); // Reset to an empty array in case of error
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log("orderId", orderId, "newStatus", newStatus);
      const response = await axios.post(
        `https://toy-station-server.onrender.com/api/users/UpdateOrder`,
        { _id: orderId, delivery_status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state with the new orders
      setOrderData(response.data.orders);
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error.response?.data || error.message);
      alert('Failed to update order status.');
    }
  };

  const handleGetDirections = async (deliveryAddress) => {
    // Check if Geolocation is available
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLat = position.coords.latitude;
        const currentLng = position.coords.longitude;

        // Construct Google Maps URL for directions
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${deliveryAddress}&travelmode=driving`;

        // Open the URL in a new tab
        window.open(googleMapsUrl, "_blank");
      },
      (error) => {
        console.error("Error getting current location:", error);
        alert("Unable to fetch your current location.");
      }
    );
  };

  return (
    <>
      <NavbarTop />
      <Container className="my-4">
        <h2 className="text-center">Your Orders</h2>
        {orderData.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <Row>
            {orderData.map((order) => (
              <Col md={6} lg={4} key={order._id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order ID: {order._id}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {order.delivery_address}
                      <br />
                      <strong>Total Price:</strong> ${order.total_amount}
                      <br />
                      <strong>Products:</strong>
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index}>
                            {product.productName} (Count: {product.count})
                          </li>
                        ))}
                      </ul>
                      <Form.Select
                        value={order.delivery_status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Not Delivered">Not Delivered</option>
                      </Form.Select>
                      <p></p>
                      <button
                        onClick={() => handleGetDirections(order.delivery_address)}
                        style={{
                          backgroundColor: 'green',
                          color: 'white',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Get Directions
                      </button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AllOrders;
