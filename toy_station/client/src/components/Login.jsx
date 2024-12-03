import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // Added state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://toy-station-server.onrender.com/api/users/login', {
        email,
        password,
      });
      // console.log(response.data);
      // console.log(response.data.user)
      // console.log(response.data.user.token)
      localStorage.setItem('email', response.data.user.email);
      console.log("token", response.data.user.token)
      localStorage.setItem('token', response.data.user.token);
      window.location.href = '/home'; // Redirect
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAlertMessage(error.response.data.message); // Invalid credentials
      } else {
        setAlertMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '100px' }}>
      <h1>Toy Station</h1>
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Login to Toy Station</h2>
            {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>} {/* Display errors */}
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-block">
                Login
              </Button>
            </Form>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
