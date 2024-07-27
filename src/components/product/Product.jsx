import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, selectAllProducts, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import { FaShoppingCart, FaRegHeart, FaHeart } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist, selectWishlist } from '../../features/wishlist/wishlistSlice';
import { addToCart } from '../../features/cart/cartSlice';
import './Product.scss';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(state => state.cart.items);

  const [visibleProducts, setVisibleProducts] = useState(6);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartNotificationProduct, setCartNotificationProduct] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSeeMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/180';
  };

  const handleToggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setCartNotificationProduct(product);
    setAnimationTrigger(true);

    setTimeout(() => {
      setShowCartNotification(true);
      setTimeout(() => {
        setShowCartNotification(false);
        setAnimationTrigger(false);
      }, 3000); // Hide notification after 3 seconds
    }, 500); // Delay to allow icon animation
  };

  let content;

  if (status === 'loading') {
    content = Array(6).fill().map((_, index) => (
      <div key={index} className="products-section__card skeleton">
        <div className="products-section__card__image-container">
          <div className="skeleton-image"></div>
        </div>
        <div className="products-section__card__info">
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
        </div>
      </div>
    ));
  } else if (status === 'succeeded') {
    content = products.slice(0, visibleProducts).map(product => (
      <div key={product.id} className="products-section__card">
        <div className="products-section__card__image-container">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="product-image" 
              onError={handleImageError}
            />
          </Link>
          {product.isNew && <span className="products-section__card__image-container__badge">New</span>}
          <div className="products-section__card__icons">
            <FaShoppingCart 
              className={`icon ${animationTrigger ? 'animate-to-notification' : ''}`} 
              onClick={() => handleAddToCart(product)} 
            />
            {wishlist.some(item => item.id === product.id) ? (
              <FaHeart className="icon filled" onClick={() => handleToggleWishlist(product)} />
            ) : (
              <FaRegHeart className="icon" onClick={() => handleToggleWishlist(product)} />
            )}
          </div>
        </div>
        <div className="products-section__card__info">
          <div className="products-section__card__info__rating">
            {Array(Math.round(product.rating)).fill().map((_, i) => (
              <span key={i} className="star">&#9733;</span>
            ))}
          </div>
          <h2 className="products-section__card__info__title">{product.title}</h2>
          <p className="products-section__card__info__price">${product.price}</p>
        </div>
      </div>
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="products-section container">
      <div className="products-section__header">
        <h1 className="products-section__header__title">Products</h1>
        <p className="products-section__header__description">Best products</p>
      </div>
      <div className="products-section__grid">
        {content}
      </div>
      {visibleProducts < products.length && (
        <button onClick={handleSeeMore} className="see-more-button">See More</button>
      )}
      {showCartNotification && cartNotificationProduct && (
        <div 
          className="cart-notification"
          onClick={() => navigate('/cart')}
        >
          <img 
            src={cartNotificationProduct.images[0]} 
            alt={cartNotificationProduct.title} 
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            onError={handleImageError}
          />
          <div className="notification-info">
            <p>Added to cart:</p>
            <p>{cartNotificationProduct.title}</p>
          </div>
          <button className="cart-notification-button">
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
