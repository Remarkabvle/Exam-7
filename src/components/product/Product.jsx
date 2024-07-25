import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectAllProducts, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import { FaShoppingCart, FaRegHeart, FaHeart } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist, selectWishlist } from '../../features/wishlist/wishlistSlice';
import './Product.scss';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const wishlist = useSelector(selectWishlist);

  const [visibleProducts, setVisibleProducts] = useState(6);

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
    // Handle adding to cart here
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
            <FaShoppingCart className="icon" onClick={() => handleAddToCart(product)} />
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
    </div>
  );
};

export default Product;
