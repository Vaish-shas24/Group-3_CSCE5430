import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarTop from './NavbarTop';
import Footer from './Footer';


const HomePage = () => {
  return (
    <>
    <NavbarTop />
    <div className="home-page">
      <div className="hero-section">
        <Container className="text-center">
          <h1 className="hero-title">Welcome to Toy Station</h1>
          <p className="hero-subtitle">Explore the best toys and games for kids</p>
          <Link to="/products">
            <Button className="shop-now-btn" size="lg">
              Shop Now
            </Button>
          </Link>
        </Container>
      </div>

      <div className="features-section">
        <Container className="text-center">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <img src="https://cdn-icons-png.flaticon.com/512/2720/2720570.png" alt="Quality Toys" />
              <h3>High Quality Toys</h3>
              <p>We offer a wide range of high-quality toys for every age group.</p>
            </div>
            <div className="feature-item">
              <img src="https://cdn-icons-png.flaticon.com/512/3391/3391960.png" alt="Affordable Prices" />
              <h3>Affordable Prices</h3>
              <p>Get the best deals and discounts on all your favorite toys.</p>
            </div>
            <div className="feature-item">
              <img src="https://cdn-icons-png.flaticon.com/512/2641/2641670.png" alt="Fast Delivery" />
              <h3>Fast Delivery</h3>
              <p>Enjoy quick and safe delivery right at your doorstep.</p>
            </div>
          </div>
        </Container>
      </div>

      <div className="promo-section text-center">
        <h2 className="promo-title">Special Discount Offer!</h2>
        <p>Up to 50% off on selected toys. Hurry up before the offer ends!</p>
        <Link to="/products">
          <Button className="promo-btn">Shop Now</Button>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HomePage;
