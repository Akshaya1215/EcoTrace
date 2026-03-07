import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  TruckIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Logo3D from './Logo3D';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Manage Users', href: '/admin/users', icon: UserGroupIcon },
    { name: 'Recycler Approvals', href: '/admin/recyclers', icon: TruckIcon },
    { name: 'Listings', href: '/admin/listings', icon: DocumentTextIcon },
    { name: 'Transactions', href: '/admin/transactions', icon: CurrencyDollarIcon },
    { name: 'Reports', href: '/admin/reports', icon: ChartBarIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
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
          <span className="sidebar-title">EcoTrace Admin</span>
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

export default AdminSidebar;
