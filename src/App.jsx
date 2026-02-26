import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelect from './pages/RoleSelect';
import DashboardLayout from './pages/dashboards/DashboardLayout';
import IndividualDashboard from './pages/dashboards/IndividualDashboard';
import CorporateDashboard from './pages/dashboards/CorporateDashboard';
import RecyclerDashboard from './pages/dashboards/RecyclerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import './styles.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<IndividualDashboard />} />
            <Route path="individual" element={<IndividualDashboard />} />
            <Route path="corporate" element={<CorporateDashboard />} />
            <Route path="recycler" element={<RecyclerDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="upload" element={<IndividualDashboard />} />
            <Route path="listings" element={<IndividualDashboard />} />
            <Route path="transactions" element={<IndividualDashboard />} />
            <Route path="analytics" element={<IndividualDashboard />} />
            <Route path="settings" element={<IndividualDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
