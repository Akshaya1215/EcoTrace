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
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
