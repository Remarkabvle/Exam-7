// pages/product/SingleProduct.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById, selectProductById, getProductsStatus, getProductsError } from '../../features/products/productsSlice';
import './SingleProduct.scss';

const SingleProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const status = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  let content;

  if (status === 'loading') {
    content = <p>Yuklanmoqda...</p>;
  } else if (status === 'succeeded' && product) {
    content = (
      <div className="product-details-container">
        <h2 className="product-name">{product.title}</h2>
        <img src={product.images[0]} alt={product.title} className="product-image" />
        <p className="product-description">{product.description}</p>
      </div>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div className="product-details">
      {content}
    </div>
  );
};

export default SingleProduct;
