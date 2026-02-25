import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RoleSelect from './pages/RoleSelect';
import DashboardLayout from './dashboards/DashboardLayout';
import IndividualDashboard from './dashboards/IndividualDashboard';
import RecyclerDashboard from './dashboards/RecyclerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import './styles.css';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<IndividualDashboard />} />
            <Route path="individual" element={<IndividualDashboard />} />
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
