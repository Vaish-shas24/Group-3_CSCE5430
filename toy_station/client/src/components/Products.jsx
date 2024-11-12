import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Row, Form, Dropdown, Modal } from 'react-bootstrap';
import { addToCart } from '../redux/actions/cartActions';
import NavbarTop from './NavbarTop';
import Footer from './Footer';

const ProductList = [
  {
    id: 1,
    name: 'Toy Car',
    description: 'A cool toy car for kids',
    price: 15,
    image: 'https://isakaabengaluru.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/04/29125018/71dEWXwH0cL._SL1500_.jpg',
    category: 'Toys',
    reviews: [
      { rating: 4, comment: 'Great toy, my kid loves it!' },
      { rating: 5, comment: 'Excellent quality for the price.' },
    ],
  },
  {
    id: 2,
    name: 'Toy Train',
    description: 'A toy train for kids',
    price: 20,
    image: 'https://m.media-amazon.com/images/I/511sKmv7JHL.jpg',
    category: 'Toys',
    reviews: [
      { rating: 1, comment: 'Disappointed with the quality.' },
      { rating: 2, comment: 'It was okay, but could have been better.' },
    ],
  },
  {
    id: 3,
    name: 'Toy Plane',
    description: 'A toy plane for kids',
    price: 25,
    image: 'https://rukminim2.flixcart.com/image/850/1000/kfk0e4w0/vehicle-pull-along/z/d/h/musical-air-plane-running-with-music-not-flying-white-topup-original-imafvzfvkhxu5apr.jpeg?q=90&crop=false',
    category: 'Toys',
    reviews: [
      { rating: 3, comment: 'Good quality, but could have been better.' },
      { rating: 4, comment: 'I love it!' },
    ],
  },
  {
    id: 4,
    name: 'Toy Robot',
    description: 'A toy robot for kids',
    price: 30,
    image: 'https://m.media-amazon.com/images/I/71j6OP1zHPL.jpg',
    category: 'Toys',
    reviews: [
      { rating: 5, comment: 'I love it!' },
      { rating: 5, comment: 'I love it!' },
    ],
  },
  {
    id: 5,
    name: 'Toy Doll',
    description: 'A toy doll for kids',
    price: 35,
    image: 'https://images.meesho.com/images/products/393169341/ueedc_512.webp',
    category: 'Toys',
    reviews: [
      { rating: 4, comment: 'Superb quality, my kid loves it!' },
      { rating: 5, comment: 'Excellent quality for the price.' },
    ],
  },
  {
    id: 6,
    name: 'Toy Truck',
    description: 'A toy truck for kids',
    price: 40,
    image: 'https://toyzone.in/cdn/shop/products/72522-02_2048x.jpg?v=1662612960',
    category: 'Toys',
    reviews: [
      { rating: 2, comment: 'Average quality, the toy is not as good as expected.' },
      { rating: 3, comment: 'Could have been better.' },
    ],
  },
  {
    id: 7,
    name: 'Football',
    description: 'Football for kids',
    price: 45,
    image: 'https://mmtoyworld.com/cdn/shop/files/mm-toys-high-quality-pvc-football-3-no-size-for-age-3-to-10-years-pack-of-1-pc-free-inflating-pin-multicolor_1.jpg?v=1684300546',
    category: 'Sports',
    reviews: [
      { rating: 4, comment: 'More quality, but could have been better.' },
      { rating: 5, comment: 'The ball is too small for my kid.' },
    ],
  },
  {
    id: 8,
    name: 'Basketball',
    description: 'Basketball for kids',
    price: 50,
    image: 'https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-product/491603946/665/491603946-1_3253.webp',
    category: 'Sports',
    reviews: [
      { rating: 3, comment: 'Basketball is not as good as expected.' },
      { rating: 4, comment: 'I love it!' },
    ],
  },
  {
    id: 9,
    name: 'Cricket Bat',
    description: 'Cricket bat for kids',
    price: 55,
    image: 'https://gmcricket.in/media/catalog/product/cache/757ea7d2b7282843694bdb6de7a23598/d/i/diamond-606-english-willow-cricket-bat_9.jpg',
    category: 'Sports',
    reviews: [
      { rating: 4, comment: 'Absolutely love it!' },
      { rating: 3, comment: 'Just okay.' },
    ],
  }
]

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};


const Products = () => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [allReviews, setAllReviews] = useState(ProductList);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleReviewSubmit = () => {
    if (selectedProduct) {
      const updatedReviews = allReviews.map((product) => {
        if (product.id === selectedProduct.id) {
          return {
            ...product,
            reviews: [...product.reviews, newReview],
          };
        }
        return product;
      });
      setAllReviews(updatedReviews);
      setShowModal(false);
      setNewReview({ rating: 0, comment: '' });
    }
  };

  const openReviewModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeReviewModal = () => {
    setShowModal(false);
    setNewReview({ rating: 0, comment: '' });
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // States for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
  };

  const handleQuantityChange = (product, change) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const newQty = existingItem ? existingItem.quantity + change : 1;

    if (newQty > 0) {
      dispatch(addToCart(product, newQty));
    }
  };

  // Filter products by search term and category
  const filteredProducts = ProductList.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const recommendations = {
    1: [2, 3],
    2: [5],
    3: [1, 4],
    4: [3, 6],
    5: [2],
    // Add other recommendations as needed
  };
  
  // Function to get recommended products based on product ID
  const getRecommendedProducts = (productId) => {
    return ProductList.filter(product => recommendations[productId]?.includes(product.id));
  };

  return (
    <>
      <NavbarTop />
      <Container>
        {/* Search and Filter Section */}
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
            <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports</option>
            </Form.Control>
          </Col>
        </Row>

        {/* Products Display Section */}
        <Row>
          {filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            filteredProducts.map((product) => {
              const productWithReviews = allReviews.find((p) => p.id === product.id);
              const averageRating = calculateAverageRating(productWithReviews.reviews);

              const existingItem = cartItems.find((item) => item.id === product.id);
              const quantity = existingItem ? existingItem.quantity : 0;

              // show recommended products only if the product is in the cart
              const recommendedProducts = existingItem ? getRecommendedProducts(product.id) : [];

              return (
                <Col key={product.id} md={4} className="mb-4" style={{padding:"20px",}}>
                  <Card className="product-card shadow-sm">
                    <Card.Img variant="top" src={product.image} className="product-image"  style={{width:"100%",}}/>
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text><strong>${product.price}</strong></Card.Text>
                      <Card.Text><strong>Rating: {averageRating}</strong></Card.Text>

                      {quantity > 0 ? (
                        <div className="d-flex align-items-center justify-content-between">
                          <Button variant="danger" onClick={() => handleQuantityChange(product, -1)}>
                            -
                          </Button>
                          <span className="mx-2">{quantity}</span>
                          <Button variant="success" onClick={() => handleQuantityChange(product, 1)}>
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button variant="primary" onClick={() => handleAddToCart(product, 1)}>
                          Add to Cart
                        </Button>
                      )}

                      <Button variant="secondary" onClick={() => openReviewModal(product)} style={{marginLeft:"10px"}}>
                        Write a Review
                      </Button>
                      
                    </Card.Body>
                  </Card>

                  {/* Recommended Shelf */}
                {recommendedProducts.length > 0 && (
                  <div className="mt-3">
                    <h5>Recommended for you</h5>
                    <Row>
                      {recommendedProducts.map((recommendedProduct) => (
                        <Col key={recommendedProduct.id} md={6} className="mb-2">
                          <Card className="recommend-card shadow-sm">
                            <Card.Img variant="top" src={recommendedProduct.image} className="product-image" style={{height:"80px"}}/>
                            <Card.Body>
                              <Card.Title className="text-truncate" style={{fontSize:"14px"}}>{recommendedProduct.name}</Card.Title>
                              <Button variant="primary" size="sm" onClick={() => handleAddToCart(recommendedProduct, 1)}>
                                Add
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
                </Col>
              );
            })
          )}
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeReviewModal}>
      <Modal.Header closeButton>
        <Modal.Title>Write a Review for {selectedProduct?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Rating (1-5)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeReviewModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Products;
