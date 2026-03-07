import React, { useState } from 'react';
import { Link, useLocation, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Logo3D from '../components/Logo3D';
import SellerDashboard from './SellerDashboard';
import UploadDevice from '../pages/seller/UploadDevice';
import MyListings from '../pages/seller/MyListings';
import ProfileSettings from '../pages/seller/ProfileSettings';
import Transactions from '../pages/seller/Transactions';
import RecyclerDashboard from './RecyclerDashboard';
import ImpactRewards from '../pages/seller/ImpactRewards';
import CorporateDashboard from './CorporateDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/', icon: HomeIcon },
    { name: 'Upload Device', href: '/dashboard/upload', icon: CloudArrowUpIcon },
    { name: 'My Listings', href: '/dashboard/listings', icon: DocumentTextIcon },
    { name: 'Transactions', href: '/dashboard/transactions', icon: BanknotesIcon },
    { name: 'Impact Rewards', href: '/dashboard/ImpactRewards', icon: Cog6ToothIcon },
    { name: 'Settings', href: '/dashboard/profile', icon: Cog6ToothIcon },

  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const renderDashboardContent = () => {
    switch (role) {
      case 'seller':
        return (
          <Routes>
            <Route index element={<SellerDashboard />} />
            <Route path="upload" element={<UploadDevice />} />
            <Route path="listings" element={<MyListings />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="ImpactRewards" element={<ImpactRewards />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        );
      case 'recycler':
        return <RecyclerDashboard />;
      case 'corporate':
        return <CorporateDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="dashboard-layout">
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Logo3D className="w-[80%] h-[80%]" />
          </div>
          <span className="sidebar-title">EcoTrace AI</span>
          <button onClick={() => setSidebarOpen(false)} className="mobile-menu-btn">
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
                onClick={() => setSidebarOpen(false)}
              >
                <IconComponent className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={() => {
              localStorage.removeItem('userRole');
              window.location.href = '/';
            }}
            className="sidebar-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="top-navbar">
          <button onClick={() => setSidebarOpen(true)} className="mobile-menu-btn">
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="profile-section">
            <button className="notification-btn">
              <BellIcon className="w-6 h-6" />
            </button>
            <div className="topbar-profile" onClick={() => navigate('/dashboard/profile')} title="Open profile settings">
              <UserCircleIcon className="w-6 h-6" />
            </div>
          </div>
        </div>

        <main className="dashboard-content">
          <div className="page-transition">
            {renderDashboardContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
