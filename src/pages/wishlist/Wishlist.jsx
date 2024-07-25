import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, selectWishlist } from '../../features/wishlist/wishlistSlice';
import { FaHeart } from 'react-icons/fa';
import './Wishlist.scss';

const Wishlist = () => {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="wishlist container">
      <h1 className="wishlist__title">Wishlist</h1>
      <div className="wishlist__grid">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist__card">
            <Link to={`/product/${product.id}`}>
              <div className="wishlist__card__image-container">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="wishlist-image"
                />
                {product.isNew && <span className="wishlist__card__image-container__badge">New</span>}
              </div>
            </Link>
            <div className="wishlist__card__info">
              <h2 className="wishlist__card__info__title">{product.title}</h2>
              <p className="wishlist__card__info__price">${product.price}</p>
              <FaHeart 
                className="icon remove-icon"
                onClick={() => handleRemove(product.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
