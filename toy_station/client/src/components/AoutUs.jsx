import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarTop from "./NavbarTop";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div>
      <NavbarTop />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '100px' }}>
        <h1 style={{ color: '#FF5733', marginTop: '5px', marginBottom: '50px' }}>Toy Station</h1>
        <Container
          className="about-us-container"
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
              <h2 className="text-center">About Us</h2>
              <p style={{ textAlign: 'justify', marginTop: '20px' }}>
                Welcome to <strong>Toy Station</strong> – your one-stop destination for all things toys! We are passionate about creating unforgettable childhood memories by providing a diverse range of toys that spark creativity, learning, and endless fun.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Our mission is to inspire imagination and spread joy among kids and families. From educational toys and puzzles to action figures and cuddly companions, our carefully curated collection ensures there’s something for everyone.
              </p>
              <p style={{ textAlign: 'justify' }}>
                At Toy Station, we prioritize quality, affordability, and customer satisfaction. Our user-friendly platform makes it easy for you to browse, select, and order your favorite toys, all from the comfort of your home.
              </p>
              <h3
                className="text-center mt-4"
                style={{ color: 'green', marginTop: '50px' }} // Custom color and extra spacing
              >
                Why Choose Us?
              </h3>
              <ul>
                <li>Exclusive and diverse toy collections.</li>
                <li>Competitive prices and exciting deals.</li>
                <li>Seamless shopping experience.</li>
                <li>Friendly customer support for all your queries.</li>
              </ul>
              <p style={{ textAlign: 'center', marginTop: '30px' }}>
                Discover the magic of play with <strong>Toy Station</strong>. Let’s make every day a playful adventure!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
