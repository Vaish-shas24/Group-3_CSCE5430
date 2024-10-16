import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      console.log(response.data); // Handle successful registration
      // Navigate to the login page after successful registration
      window.location.href = '/'; // Redirect to login page
    } catch (error) {
      console.error(error.response.data); // Handle errors
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"100px"}}>
      <h1>Toy Station</h1>
    <Container className="login-container">
      <Row className="justify-content-center">
      <h2>Register for Toy Station</h2>
      <Form onSubmit={handleSubmit} className="register-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

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
          Register
        </Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/" className="link">Login here</Link>
      </p>
      </Row>
    </Container>
    </div>
  );
};

export default Register;
