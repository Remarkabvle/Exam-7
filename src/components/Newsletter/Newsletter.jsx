import React from 'react';
import './Newsletter.scss';

const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2>Join Our Newsletter</h2>
        <p>Sign up for deals, new products and promotions</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Email address" />
          <button type="submit">Signup</button>
        </form>
      </div>
      <div className="newsletter-image">
        <img src="path_to_image.jpg" alt="Newsletter" />
      </div>
    </div>
  );
};

export default Newsletter;
