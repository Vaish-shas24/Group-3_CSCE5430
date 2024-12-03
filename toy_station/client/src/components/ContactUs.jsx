import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from "./NavbarTop";
import Footer from "./Footer";

const ContactUs = () => {
  const contactDetails = {
    email: "tejanagendrasirigineedi@my.unt ",
    phone: "+1 940 597 3113 "
  };

  return (
    <div>
      <NavbarTop />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '100px' }}>
        <h1 style={{ color: '#FF5733', marginTop: '50px', marginBottom: '50px' }}>Toy Station</h1>
        <Container
          className="contact-us-container"
          style={{
            backgroundColor: '#f8f9fa', // Light gray background
            border: '2px solid #FF5733', // Orange border
            borderRadius: '10px', // Rounded corners
            padding: '20px', // Padding inside the container
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for effect
          }}
        >
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <h2 className="text-center">Contact Us</h2>
              <p style={{ textAlign: 'justify', marginTop: '20px' }}>
                Have questions or need help? Get in touch with us using the contact details below.
              </p>
              <div style={{ marginTop: '30px' }}>
                <p>
                  <strong>Email:</strong>{' '}
                  <span style={{ color: '#FF5733' }}>{contactDetails.email}</span>
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <span style={{ color: '#FF5733' }}>{contactDetails.phone}</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
