import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaHome, FaUsers, FaHandHoldingHeart, FaCalendar, FaDollarSign } from 'react-icons/fa';

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              <FaHome /> NGO System
            </Link>
            <div className="hidden md:flex gap-6">
              <Link to="/dashboard" className="hover:text-blue-400 flex items-center gap-2">
                <FaHome /> Dashboard
              </Link>
              <Link to="/volunteers" className="hover:text-blue-400 flex items-center gap-2">
                <FaUsers /> Volunteers
              </Link>
              <a href="#" className="hover:text-blue-400 flex items-center gap-2">
                <FaDollarSign /> Donations
              </a>
              <a href="#" className="hover:text-blue-400 flex items-center gap-2">
                <FaHandHoldingHeart /> Beneficiaries
              </a>
              <a href="#" className="hover:text-blue-400 flex items-center gap-2">
                <FaCalendar /> Events
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
