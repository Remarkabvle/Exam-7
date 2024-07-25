import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, selectProductById, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import { AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { GoArrowRight } from 'react-icons/go';
import './SingleProduct.scss';

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const [choose, setChoose] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600'; // Zaxira rasm manzili
  };

  let content;

  if (status === 'loading') {
    content = <p>Yuklanmoqda...</p>;
  } else if (status === 'succeeded' && product) {
    content = (
      <div className="product-details-container container">
        <div className="product-details">
          <div className="product-images">
            <img 
              src={product.images[choose]} 
              alt={product.title} 
              className="main-image" 
              onError={handleImageError}
            />
            <div className="thumbnail-images">
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
            </div>
          </div>
          <div className="product-info">
            <h2 className="product-name">{product.title}</h2>
            <div className="product-rating">
              {Array(Math.round(product.rating)).fill().map((_, i) => (
                <AiFillStar key={i} />
              ))}
              <span>{product.reviewsCount} Reviews</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.oldPrice && product.oldPrice > product.price && (
                <span className="old-price">${product.oldPrice}</span>
              )}
            </div>
            <div className="product-actions">
              <div className="quantity-selector">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
              <button className="wishlist-button">
                <AiOutlineHeart /> Wishlist
              </button>
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="single-product-page">
      {content}
    </div>
  );
};

export default SingleProduct;
