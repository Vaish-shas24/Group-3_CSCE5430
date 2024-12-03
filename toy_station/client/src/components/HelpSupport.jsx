import React, { useState } from 'react';
import { Container, Accordion, Card, Form, Button, Col, Row } from 'react-bootstrap';
import NavbarTop from './NavbarTop';
import Footer from "./Footer";

const HelpSupport = () => {
  // List of Frequently Asked Questions
  const faqs = [
    { question: "How can I track my order?", answer: "You can track your order from the Orders section in your account." },
    { question: "What is the return policy?", answer: "You can return most items within 30 days of purchase. Check the Return Policy section for more details." },
    { question: "How do I contact customer support?", answer: "You can reach out to us via email or through this support form." },
    { question: "Are there any discounts for new customers?", answer: "Yes, new customers get a 10% discount on their first order with code NEW10." },
    { question: "How do I cancel my order?", answer: "To cancel an order, go to Orders, select the order, and click on 'Cancel Order'." }
  ];

  // State for handling form submission
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the form (e.g., send to backend)
    console.log('Form data:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <NavbarTop />
    <Container className="mt-5">
      <h2>Help & Support</h2>
      <p>Find answers to common questions or submit a request if you need further assistance.</p>

      {/* FAQ Section */}
      <h4>Frequently Asked Questions</h4>
      <Accordion>
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Request Submission Form */}
      <h4 className="mt-5">Submit a Request</h4>
      {formSubmitted && <p className="text-success">Your request has been submitted successfully!</p>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit Request</Button>
      </Form>
    </Container>
    <Footer />
    </>
  );
};

export default HelpSupport;
