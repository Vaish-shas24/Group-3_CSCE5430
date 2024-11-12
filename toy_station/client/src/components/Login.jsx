import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/api/auth/login', {
        email,
        password,
      });
      console.log(response.data); // Handle successful login
      // Store email and token in local storage
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('token', response.data.token);
      // Navigate to another page after successful login
      window.location.href = '/home'; // Redirect to home page or dashboard
    } catch (error) {
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"100px"}}>
      <h1>Toy Station</h1>
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Login to Toy Station</h2>
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

