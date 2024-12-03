import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import NavbarTop from './NavbarTop';
import Footer from './Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    category: '',
    description: '',
    price: '',
    image: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [clickedCartProducts, setClickedCartProducts] = useState([]); // Track products with disabled "Add to Cart"
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://toy-station-server.onrender.com/api/users/getproducts');
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products);
        } else {
          console.error('Failed to fetch products:', data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setClickedCartProducts((prev) => [...prev, product._id]); // Disable the button immediately

    try {
      await axios.post(
        'https://toy-station-server.onrender.com/api/users/add_to_cart',
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <NavbarTop />
      <Container>
        <Row className="mt-4 mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports</option>
            </Form.Control>
          </Col>
        </Row>
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setShowAddProductModal(true)}
        >
          ADD PRODUCT
        </button>

        <Row>
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <Col key={product._id} md={4} className="mb-4" style={{ padding: '20px' }}>
                <Card className="product-card shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="product-image"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'contain', // Ensures the image fits without distortion
                      backgroundColor: '#f8f8f8', // Optional: adds a background color
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      <strong>{product.price}</strong>
                    </Card.Text>
                    {clickedCartProducts.includes(product._id) ? (
                      <Button variant="secondary" disabled>
                        Added to Cart
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />

      {/* Add Product Modal */}
      <Modal show={showAddProductModal} onHide={() => setShowAddProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                value={newProduct.product_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddProductModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Add Product</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;
