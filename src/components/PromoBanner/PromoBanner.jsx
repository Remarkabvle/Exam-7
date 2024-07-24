import React from 'react';
import './PromoBanner.scss';
import l1 from '../../assets/l1.png'

const PromoBanner = () => {
  return (
    <div className="promo-banner">
      <div className="promo-banner__left">
        <img
          src={l1}
          alt="Living Room"
          className="promo-banner__image"
        />
      </div>
      <div className="promo-banner__right">
        <p className="promo-banner__desc">SALE UP TO 35% OFF</p>
        <h1 className="promo-banner__title">HUNDREDS of New lower prices!</h1>
        <p className="promo-banner__text">
          It’s more affordable than ever to give every room in your home a
          stylish makeover
        </p>
        <button className="promo-banner__shop">Shop Now →</button>
      </div>
    </div>
  );
};

export default PromoBanner;
