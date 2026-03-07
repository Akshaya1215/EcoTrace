import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CloudArrowUpIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Logo3D from './Logo3D';

const CorporateSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/corporate', icon: HomeIcon },
    { name: 'Bulk Upload', href: '/corporate/bulk-upload', icon: CloudArrowUpIcon },
    { name: 'Pickup Schedule', href: '/corporate/pickup', icon: CalendarIcon },
    { name: 'My Listings', href: '/corporate/listings', icon: DocumentTextIcon },
    { name: 'Transactions', href: '/corporate/transactions', icon: CurrencyDollarIcon },
    { name: 'Impact Reports', href: '/corporate/impact', icon: ChartBarIcon },
    { name: 'Profile', href: '/corporate/profile', icon: UserIcon },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Logo3D className="w-[80%] h-[80%]" />
          </div>
          <span className="sidebar-title">EcoTrace Corporate</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="mobile-menu-btn"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <IconComponent />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link
            to="/"
            className="sidebar-link"
          >
            <ArrowRightOnRectangleIcon />
            Sign Out
          </Link>
        </div>
      </div>
    </>
  );
};

export default CorporateSidebar;
