import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BellIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar = ({ user, onMenuToggle, sidebarOpen }) => {
  return (
    <div className="top-navbar">
      <button
        onClick={onMenuToggle}
        className="mobile-menu-btn"
      >
        {sidebarOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      <div className="profile-section">
        <button className="notification-btn">
          <BellIcon className="w-6 h-6" />
        </button>
        <div className="user-profile">
          <div className="user-info">
            <p className="user-name">{user?.name || 'John Doe'}</p>
            <p className="user-role">{user?.role || 'Individual User'}</p>
          </div>
          <div className="user-avatar">
            <UserCircleIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
