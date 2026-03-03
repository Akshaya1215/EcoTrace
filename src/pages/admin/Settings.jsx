import React, { useState } from 'react';
import { Cog6ToothIcon, ShieldCheckIcon, BellIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  const [formData, setFormData] = useState({
    platformName: 'EcoTrace AI',
    platformEmail: 'admin@ecotrace.ai',
    supportEmail: 'support@ecotrace.ai',
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    autoApproveRecyclers: false,
    commissionRate: '5',
    minPayoutAmount: '50'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Platform settings updated successfully!');
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Platform Settings</h1>
      <p className="page-subtitle">Configure platform-wide settings and preferences</p>
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Platform Configuration */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Platform Configuration</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label className="form-label">Platform Name</label>
                <input
                  type="text"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Platform Email</label>
                <input
                  type="email"
                  name="platformEmail"
                  value={formData.platformEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div>
                <label className="form-label">Support Email</label>
                <input
                  type="email"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* User Management */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">User Management</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={formData.maintenanceMode}
                  onChange={handleChange}
                />
                <span>Maintenance Mode (Disable user access)</span>
              </label>
              
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="userRegistration"
                  checked={formData.userRegistration}
                  onChange={handleChange}
                />
                <span>Allow New User Registration</span>
              </label>
              
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="autoApproveRecyclers"
                  checked={formData.autoApproveRecyclers}
                  onChange={handleChange}
                />
                <span>Auto-approve Recycler Applications</span>
              </label>
            </div>
          </div>

          {/* Financial Settings */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Financial Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Commission Rate (%)</label>
                <input
                  type="number"
                  name="commissionRate"
                  value={formData.commissionRate}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="form-label">Minimum Payout Amount ($)</label>
                <input
                  type="number"
                  name="minPayoutAmount"
                  value={formData.minPayoutAmount}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Notifications</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                />
                <span>Enable Email Notifications</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
            <button type="button" className="btn btn-secondary">
              Reset to Defaults
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
