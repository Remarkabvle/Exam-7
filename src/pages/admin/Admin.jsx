import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit } from 'react-icons/fa';
import './AdminDashboard.css';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`admin-dashboard ${isAdminPage ? 'admin-page' : ''}`}>
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="create-product">
              <FaPlus className="icon" /> Create product
            </Link>
          </li>
          <li>
            <Link to="manage-product">
              <FaEdit className="icon" /> Manage product
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
