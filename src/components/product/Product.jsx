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

  const [visibleProducts, setVisibleProducts] = useState(6);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSeeMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 6);
  };

  let content;

  if (status === 'loading') {
    content = <p>Yuklanmoqda...</p>;
  } else if (status === 'succeeded') {
    content = products.slice(0, visibleProducts).map(product => (
      <div key={product.id} className="products-section__card">
        <Link to={`/product/${product.id}`}>
          <div className="products-section__card__image-container">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            {product.isNew && <span className="products-section__card__image-container__badge">New</span>}
          </div>
        </Link>
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
        <h1 className="products-section__header__title">Mahsulotlar</h1>
        <p className="products-section__header__description">Eng yaxshi mahsulotlar</p>
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
