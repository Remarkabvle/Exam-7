import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, selectProductById, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import { AiOutlineHeart, AiFillHeart, AiFillStar, AiOutlineClose } from 'react-icons/ai';
import { addToWishlist, removeFromWishlist, selectWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart, selectCart, incrementCart, decrementCart } from '../../features/cart/cartSlice';
import { Box, Button, Typography, IconButton, TextField } from '@mui/material';
import ModalReview from './ReviewForm';
import './SingleProduct.scss';

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(state => selectProductById(state, productId));
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(selectCart);

  const [choose, setChoose] = useState(0);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartNotificationProduct, setCartNotificationProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    const cartProduct = cart.find(item => item.id === productId);
    setQuantity(cartProduct ? cartProduct.quantity : 0);
  }, [cart, productId]);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600'; // Fallback image URL
  };

  const handleToggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    if (quantity === 0) {
      dispatch(addToCart(product));
    } else {
      dispatch(incrementCart({ id: product.id }));
    }
    setCartNotificationProduct(product);
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000); // Hide notification after 3 seconds
  };

  const handleQuantityChange = (change) => {
    if (change === 'increment') {
      dispatch(incrementCart({ id: product.id }));
    } else if (change === 'decrement' && quantity > 0) {
      dispatch(decrementCart({ id: product.id }));
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitReview = (reviewData) => {
    setReviews([...reviews, reviewData]);
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded' && product) {
    content = (
      <Box className="product-details-container container">
        <Box className="product-details">
          <Box className="product-images">
            <img 
              src={product.images[choose]} 
              alt={product.title} 
              className="main-image" 
              onError={handleImageError}
            />
            <Box className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  className={`thumbnail ${choose === index ? 'active' : ''}`}
                  onClick={() => setChoose(index)}
                  onError={handleImageError}
                />
              ))}
            </Box>
          </Box>
          <Box className="product-info">
            <Typography variant="h4" component="h2" className="product-name">{product.title}</Typography>
            <Box className="product-rating">
              {Array(Math.round(product.rating)).fill().map((_, i) => (
                <AiFillStar key={i} />
              ))}
              <Typography component="span">{product.reviewsCount} Reviews</Typography>
            </Box>
            <Typography component="p" className="product-description">{product.description}</Typography>
            <Box className="product-price">
              <Typography component="span" className="current-price">${product.price}</Typography>
              {product.oldPrice && product.oldPrice > product.price && (
                <Typography component="span" className="old-price">${product.oldPrice}</Typography>
              )}
            </Box>
            <Box className="product-actions">
              {quantity > 0 && (
                <Box className="quantity-selector">
                  <Button onClick={() => handleQuantityChange('decrement')}>-</Button>
                  <Typography component="span">{quantity}</Typography>
                  <Button onClick={() => handleQuantityChange('increment')}>+</Button>
                </Box>
              )}
              <Button 
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
                variant="contained"
                color="primary"
              >
                {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
              </Button>
              <Button 
                className="wishlist-button" 
                onClick={() => handleToggleWishlist(product)}
                startIcon={wishlist.some(item => item.id === product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
              >
                Wishlist
              </Button>
            </Box>
            <Box className="review-section">
              <Typography variant="h5" component="h3">Write a Review</Typography>
              <Button 
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                className="add-review-button"
              >
                Add Review
              </Button>
              <Box className="reviews-list">
                <Typography variant="h5" component="h3">Reviews</Typography>
                {reviews.length > 0 ? reviews.map((rev, index) => (
                  <Box key={index} className="review-item">
                    <Box className="review-rating">
                      {Array(rev.rating).fill().map((_, i) => (
                        <AiFillStar key={i} />
                      ))}
                    </Box>
                    <Typography component="p" className="review-comment">{rev.comment}</Typography>
                  </Box>
                )) : <Typography component="p">No reviews yet.</Typography>}
              </Box>
            </Box>
          </Box>
        </Box>
        {showCartNotification && cartNotificationProduct && (
          <Box 
            sx={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1000,
              width: '800px',
              height: '100px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              textAlign: 'left'
            }}
          >
            <img 
              src={cartNotificationProduct.images[0]} 
              alt={cartNotificationProduct.title} 
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              onError={handleImageError}
            />
            <Box sx={{ flex: 1, marginLeft: '16px' }}>
              <Typography component="p" sx={{ fontWeight: 'bold' }}>Product Added to Cart</Typography>
              <Typography component="p">{cartNotificationProduct.title}</Typography>
            </Box>
            <Button onClick={goToCart} variant="contained" color="primary">
              Go to Cart
            </Button>
            <IconButton onClick={() => setShowCartNotification(false)}>
              <AiOutlineClose />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  } else if (status === 'failed') {
    content = <Typography component="p">{error}</Typography>;
  }

  return (
    <Box className="single-product-page">
      {content}
      <ModalReview open={isModalOpen} handleClose={handleCloseModal} onSubmit={handleSubmitReview} />
    </Box>
  );
};

export default SingleProduct;
