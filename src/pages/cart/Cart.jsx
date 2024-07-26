import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, removeFromCart } from '../../features/cart/cartSlice';
import './Cart.scss'; // Assuming you have some styles for the Cart component

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.images[0]} alt={product.title} />
              <div className="cart-item-info">
                <h2>{product.title}</h2>
                <p>${product.price}</p>
                <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
