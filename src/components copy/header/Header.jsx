import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar container">
        <div className="navbar-container">
          <div className="navbar-logo">
            <NavLink to="/">
              <img src={logo} alt="Logo" />
            </NavLink>
          </div>
          <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
            <li>
              <NavLink to="/" activeClassName="active" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" activeClassName="active" onClick={closeMenu}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" activeClassName="active" onClick={closeMenu}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active" onClick={closeMenu}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="navbar-icons">
            <FaSearch className="icon" />
            <FaUser className="icon" />
            <div className="icon-bag">
              <FaShoppingBag className="icon" />
              <span className="badge">2</span>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
              {menuOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar;
