import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom"; // Qo'shilgan: useLocation
import { useSelector } from "react-redux";
import {
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaArrowUp,
} from "react-icons/fa";
import "./Navbar.scss";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation(); // Qo'shilgan

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setBackToTopVisible(true);
    } else {
      setBackToTopVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminPage = location.pathname.startsWith('/admin'); // Qo'shilgan

  return (
    <>
      {!isAdminPage && ( // Qo'shilgan
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
              <li>
                <NavLink to="/wishlist" activeClassName="active" onClick={closeMenu}>
                  Wishlist
                </NavLink>
              </li>
            </ul>
            <div className="navbar-icons">
              <FaSearch className="icon" />
              <FaUser className="icon" onClick={handleUserIconClick} />
              <div className="icon-bag">
                <NavLink to="/cart" activeClassName="active" onClick={closeMenu}>
                  <FaShoppingBag className="icont" />
                </NavLink>
              </div>
              <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? (
                  <FaTimes className="icont" />
                ) : (
                  <FaBars className="icont" />
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
      {backToTopVisible && (
        <div className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp className="icon" />
        </div>
      )}
    </>
  );
};

export default Navbar;
