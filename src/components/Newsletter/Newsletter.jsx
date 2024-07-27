import React from 'react';
import { FiMail } from 'react-icons/fi'; // Importing the mail icon
import './Newsletter.scss';

const Newsletter = () => {
  return (
    <div className="Newsletter">
      <div className="Newsletter-container container">
      <div className="Newsletter__content">
        <h2 className="Newsletter__title">Join Our Newsletter</h2>
        <p className="Newsletter__desc">Sign up for deals, new products, and promotions</p>
        <form className="Newsletter__form">
          <div className="Newsletter__inputWrapper">
            <FiMail className="Newsletter__icon" />
            <input  type="email" placeholder="Email address" className="Newsletter__input" />
          <button type="submit" className="Newsletter__button">Signup</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Newsletter;
