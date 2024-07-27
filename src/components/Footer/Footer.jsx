import React from "react";
import "./Footer.scss";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h3>3legant</h3>
            <p>Gift & Decoration Store</p>
          </div>
          <div className="footer-center">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Product</a>
            <a href="#">Blog</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="footer-right">
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2023 3legant. All rights reserved</p>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
