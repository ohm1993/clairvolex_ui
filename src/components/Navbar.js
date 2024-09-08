import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">Dashboard</NavLink>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard">
              Books
            </NavLink>
          </li>
          {user?.role !== 'user' && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-book">
                Add Book
              </NavLink>
            </li>
          )}
        </ul>
        <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
