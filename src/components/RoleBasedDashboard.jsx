import React from 'react';
import SellerDashboard from '../dashboards/SellerDashboard';
import RecyclerDashboard from '../dashboards/RecyclerDashboard';
import CorporateDashboard from '../dashboards/CorporateDashboard';
import AdminDashboard from '../dashboards/AdminDashboard';
import RoleSelect from '../pages/RoleSelect';

const RoleBasedDashboard = () => {
  const role = localStorage.getItem('userRole');

  if (!role) {
    return <RoleSelect />;
  }

  switch (role) {
    case 'seller':
      return <SellerDashboard />;
    case 'recycler':
      return <RecyclerDashboard />;
    case 'corporate':
      return <CorporateDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <RoleSelect />;
  }
};

export default RoleBasedDashboard;
