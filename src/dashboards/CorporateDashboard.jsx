import React from 'react';
import DashboardLayout from './DashboardLayout';

const CorporateDashboard = () => {
  return (
    <DashboardLayout>
      <div className="page-content">
        <h1 className="page-title">Corporate Dashboard</h1>
        <p className="page-subtitle">
          Welcome to the Corporate dashboard. Track your organization's e-waste recycling impact.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
