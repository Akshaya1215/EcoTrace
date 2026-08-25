import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Logo3D from '../Logo3D';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const role = localStorage.getItem('role');

  const navigation = React.useMemo(() => {
    switch (role) {
      case 'seller':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
          { name: 'Upload Device', href: '/dashboard/upload', icon: CloudArrowUpIcon },
          { name: 'My Listings', href: '/dashboard/listings', icon: DocumentTextIcon },
          { name: 'Transactions', href: '/dashboard/transactions', icon: BanknotesIcon },
          { name: 'Rewards', href: '/dashboard/impact', icon: ChartBarIcon },
          { name: 'Profile Settings', href: '/dashboard/profile', icon: Cog6ToothIcon },
        ];
      case 'recycler':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
          { name: 'Available Listings', href: '/dashboard/available', icon: DocumentTextIcon },
          { name: 'Accepted Devices', href: '/dashboard/accepted', icon: CheckCircleIcon },
          { name: 'Transactions', href: '/dashboard/transactions', icon: BanknotesIcon },
          { name: 'Material Insights', href: '/dashboard/insights', icon: ChartBarIcon },
          { name: 'Sustainability Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
          { name: 'Profile Settings', href: '/dashboard/profile', icon: Cog6ToothIcon },
        ];
      case 'corporate':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
          { name: 'Bulk Upload', href: '/dashboard/bulk-upload', icon: CloudArrowUpIcon },
          { name: 'Reports', href: '/dashboard/reports', icon: DocumentTextIcon },
          { name: 'Compliance Certificates', href: '/dashboard/certificates', icon: DocumentTextIcon },
          { name: 'Sustainability Insights', href: '/dashboard/sustainability', icon: ChartBarIcon },
          { name: 'Profile Settings', href: '/dashboard/profile', icon: Cog6ToothIcon },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
          { name: 'User Management', href: '/dashboard/users', icon: UserGroupIcon },
          { name: 'Recycler Approvals', href: '/dashboard/approvals', icon: BuildingOfficeIcon },
          { name: 'Transaction Logs', href: '/dashboard/logs', icon: BanknotesIcon },
          { name: 'AI Logs', href: '/dashboard/ai-logs', icon: ChartBarIcon },
          { name: 'Revenue Analytics', href: '/dashboard/revenue', icon: CurrencyDollarIcon },
          { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
        ];
      default:
        return [];
    }
  }, [role]);

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="app-container">
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
          <span className="sidebar-title">EcoTrace AI</span>
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
          <button
            className="sidebar-link"
            onClick={() => {
              localStorage.removeItem('userRole');
              window.location.href = '/';
            }}
          >
            <ArrowRightOnRectangleIcon />
            Change Role
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top navigation */}
        <div className="top-navbar">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-menu-btn"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="profile-section">
            <button className="notification-btn">
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="user-profile">
              <div className="user-info">
                <p className="user-name">John Doe</p>
                <p className="user-role">{role ? role.charAt(0).toUpperCase() + role.slice(1) : ''}</p>
              </div>
              <div className="user-avatar">
                <UserCircleIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
