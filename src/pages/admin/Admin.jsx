// Admin.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><Link to="create-product">Create product</Link></li>
          <li><Link to="manage-product">Manage product</Link></li>
          <li><Link to="create-category">Create category</Link></li>
          <li><Link to="manage-category">Manage category</Link></li>
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
