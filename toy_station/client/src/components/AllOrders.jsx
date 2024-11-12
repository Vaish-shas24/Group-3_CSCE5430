import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, ListGroup, Card, Button } from 'react-bootstrap';
import NavbarTop from './NavbarTop';
import Footer from './Footer';


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem('email'); // Get user email from localStorage

  const handleReturn = async (orderId, itemId) => {
    try {
      await axios.post(`/api/orders/return`, { orderId, itemId });
      alert('Return request submitted successfully!');
      
      // fetch updated orders
      const response = await axios.get(`/api/orders/user/${userEmail}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error submitting return request:', error.response?.data || error.message);
      alert('Failed to submit return request.');
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/user/${userEmail}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <>
      <NavbarTop />
      <Container className="my-4 all-orders-container">
        <h2 className="order-title">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <Card className="mb-3 order-card" key={order._id}>
              <Card.Header>
                <strong>Order ID:</strong> {order._id} <br />
                <strong>Total Amount:</strong> ${order.totalAmount}
              </Card.Header>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index} className="order-item">
                    <div className="d-flex justify-content-between">
                      <span>{item.name}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.total}</span>
                      {item.returned && <span className="text-success">Returned</span>}
                      {!item.returned && 
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleReturn(order._id, item._id)} // Assuming item has an _id
                        >
                          Return
                        </Button>
                      }
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ))
        )}
      </Container>
      <Footer />
    </>
  );
};

export default AllOrders;
