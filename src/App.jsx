import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import RoleBasedDashboard from './components/RoleBasedDashboard';
import DashboardLayout from './dashboards/DashboardLayout';
import SellerDashboard from './dashboards/SellerDashboard';
import UploadDevice from './pages/seller/UploadDevice';
import MyListings from './pages/seller/MyListings';
import ProfileSettings from './pages/seller/ProfileSettings';
import Transactions from './pages/seller/Transactions';

// Admin imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Recyclers from './pages/admin/Recyclers';
import AdminListings from './pages/admin/Listings';
import AdminTransactions from './pages/admin/Transactions';
import Reports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';

// Corporate imports
import CorporateLayout from './layouts/CorporateLayout';
import CorporateDashboard from './pages/corporate/Dashboard';
import BulkUpload from './pages/corporate/BulkUpload';
import PickupSchedule from './pages/corporate/PickupSchedule';
import CorporateListings from './pages/corporate/Listings';
import CorporateTransactions from './pages/corporate/Transactions';
import ImpactReports from './pages/corporate/ImpactReports';
import CorporateProfile from './pages/corporate/Profile';

// Recycler imports
import RecyclerLayout from './layouts/RecyclerLayout';
import RecyclerDashboard from './pages/recycler/Dashboard';
import AvailableListings from './pages/recycler/AvailableListings';
import AcceptedDevices from './pages/recycler/AcceptedDevices';
import Processing from './pages/recycler/Processing';
import RecyclerPayments from './pages/recycler/Payments';
import MaterialsRecovered from './pages/recycler/MaterialsRecovered';
import RecyclerProfile from './pages/recycler/Profile';

import './styles.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        
        {/* Seller routes - UNCHANGED */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="recyclers" element={<Recyclers />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Corporate routes */}
        <Route path="/corporate" element={<CorporateLayout />}>
          <Route index element={<CorporateDashboard />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
          <Route path="pickup" element={<PickupSchedule />} />
          <Route path="listings" element={<CorporateListings />} />
          <Route path="transactions" element={<CorporateTransactions />} />
          <Route path="impact" element={<ImpactReports />} />
          <Route path="profile" element={<CorporateProfile />} />
        </Route>
        
        {/* Recycler routes */}
        <Route path="/recycler" element={<RecyclerLayout />}>
          <Route index element={<RecyclerDashboard />} />
          <Route path="available" element={<AvailableListings />} />
          <Route path="accepted" element={<AcceptedDevices />} />
          <Route path="processing" element={<Processing />} />
          <Route path="payments" element={<RecyclerPayments />} />
          <Route path="materials" element={<MaterialsRecovered />} />
          <Route path="profile" element={<RecyclerProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
