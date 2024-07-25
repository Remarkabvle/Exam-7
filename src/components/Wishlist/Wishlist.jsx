// src/components/Wishlist/Wishlist.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../features/wishlist/wishlistSlice';

const Wishlist = () => {
  const wishlist = useSelector(selectWishlist);

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
