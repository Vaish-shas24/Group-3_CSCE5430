import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
// import { useDispatch } from 'react-redux'; // Import useDispatch
// import { logout } from '../redux/actions/authActions'; // Import logout action

export default function NavbarTop() {
//   const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear the token and user data from local storage
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');

    // Dispatch the logout action
    // dispatch(logout());

    // Optionally, you can redirect to the login page or home page
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">Toy Station</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <LinkContainer to="/home">
              <Nav.Link eventKey={1}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link eventKey={2}>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/all-orders">
              <Nav.Link eventKey={3}>All Orders</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link eventKey={4}>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/help-support">
              <Nav.Link eventKey={5}>Help & Support</Nav.Link>
            </LinkContainer>
            <Nav.Link eventKey={6} onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
