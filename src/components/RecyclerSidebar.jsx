import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Logo3D from './Logo3D';

const RecyclerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/recycler', icon: HomeIcon },
    { name: 'Available Listings', href: '/recycler/available', icon: DocumentTextIcon },
    { name: 'Accepted Devices', href: '/recycler/accepted', icon: CheckCircleIcon },
    { name: 'Processing', href: '/recycler/processing', icon: ArrowPathIcon },
    { name: 'Payments', href: '/recycler/payments', icon: CurrencyDollarIcon },
    { name: 'Materials Recovered', href: '/recycler/materials', icon: TruckIcon },
    { name: 'Profile', href: '/recycler/profile', icon: UserIcon },
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
          <span className="sidebar-title">EcoTrace Recycler</span>
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

export default RecyclerSidebar;
