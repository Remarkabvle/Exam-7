import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { removeFromCart, incrementCart, decrementCart } from '../../features/cart/cartSlice';
import './Cart.scss';

const Cart = () => {
  const cartData = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartData.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, type) => {
    if (type === 'increment') {
      dispatch(incrementCart({ id }));
    } else {
      dispatch(decrementCart({ id }));
    }
  };

  return (
    <div className="shopping-cart container">
      <div className="shopping-cart__container">
        <div className="shopping-cart__content">
          <div className="shopping-cart__header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="shopping-cart__list">
            {cartData.length === 0 ? (
              <p className="shopping-cart__empty">Your cart is empty</p>
            ) : (
              <div className="shopping-cart__items">
                {cartData.map((product) => (
                  <div key={product.id} className="shopping-cart__item">
                    <div className="shopping-cart__item__image">
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className="shopping-cart__info">
                      <h2>{product.title}</h2>
                      <p>Color: {product.color}</p>
                      <div className="shopping-cart__quantity">
                        <button onClick={() => handleQuantityChange(product.id, 'decrement')}><FaMinus /></button>
                        <span>{product.quantity}</span>
                        <button onClick={() => handleQuantityChange(product.id, 'increment')}><FaPlus /></button>
                      </div>
                      <p>${product.price.toFixed(2)}</p>
                      <p>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
                      <button onClick={() => handleRemove(product.id)} className="shopping-cart__remove"><FaTimes /> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {cartData.length > 0 && (
          <div className="shopping-cart__summary">
            <div className="cart-summary">
              <h2>Cart summary</h2>
              <div className="cart-summary__shipping">
                <div>
                  <input type="radio" id="free-shipping" name="shipping" defaultChecked />
                  <label htmlFor="free-shipping">Free shipping</label>
                  <span>$0.00</span>
                </div>
                <div>
                  <input type="radio" id="express-shipping" name="shipping" />
                  <label htmlFor="express-shipping">Express shipping</label>
                  <span>$15.00</span>
                </div>
                <div>
                  <input type="radio" id="pick-up" name="shipping" />
                  <label htmlFor="pick-up">Pick Up</label>
                  <span>$21.00</span>
                </div>
              </div>
              <div className="cart-summary__total">
                <p>Subtotal: ${calculateTotal()}</p>
                <p>Total: ${(parseFloat(calculateTotal()) + 0).toFixed(2)}</p>
              </div>
              <button onClick={handleCheckout} className="cart-summary__checkout-button">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
