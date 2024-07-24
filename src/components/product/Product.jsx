import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectAllProducts, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import './Product.scss';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  const [visibleProducts, setVisibleProducts] = useState(6); // Boshlang'ich limit

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSeeMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6); // Har safar 6 ta mahsulot qo'shish
  };

  let content;

  if (status === 'loading') {
    content = <p>Yuklanmoqda...</p>;
  } else if (status === 'succeeded') {
    content = products.slice(0, visibleProducts).map(product => (
      <div key={product.id} className="product-card">
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.title} className="product-image" />
        </Link>
        <div className="product-details">
          <div className="product-rating">
            {Array(Math.round(product.rating)).fill().map((_, i) => (
              <span key={i} className="star">&#9733;</span>
            ))}
          </div>
          <h2 className="product-name">{product.title}</h2>
          <p className="product-price">${product.price}</p>
        </div>
      </div>
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="shop-container">
      <div className="product-list">
        {content}
      </div>
      {visibleProducts < products.length && (
        <button onClick={handleSeeMore} className="see-more-button">See More</button>
      )}
    </div>
  );
};

export default Product;
