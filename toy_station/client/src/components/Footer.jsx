import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Footer() {
    return (
        <div className="footer-section">
          <Container>
            <Row>
              <Col md={4}>
                <h5 className="footer-title">Toy Station</h5>
                <p className="footer-text">
                  Your one-stop shop for the best toys and games for kids of all ages. Explore a wide range of exciting and educational toys.
                </p>
              </Col>
    
              <Col md={2}>
                <h5 className="footer-title">Quick Links</h5>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/products">Shop</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/help-support">Help & Support</a></li>
                </ul>
              </Col>
    
              <Col md={3}>
                <h5 className="footer-title">Follow Us</h5>
                <ul className="social-icons">
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </Col>
    
              <Col md={3}>
                <h5 className="footer-title">Newsletter</h5>
                <p className="footer-text">Subscribe to get the latest updates and offers.</p>
                <Form className="newsletter-form">
                  <Form.Group controlId="formNewsletter">
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Button variant="primary" className="subscribe-btn">Subscribe</Button>
                </Form>
              </Col>
            </Row>
    
            <Row className="text-center mt-4">
              <Col>
                <p className="copyright-text">
                  &copy; {new Date().getFullYear()} Toy Station. All rights reserved.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      );
}
