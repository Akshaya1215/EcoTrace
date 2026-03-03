import React, { useState } from 'react';
import { BuildingOfficeIcon, UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const CorporateProfile = () => {
  const [formData, setFormData] = useState({
    companyName: 'Tech Corporation',
    industry: 'Technology',
    companySize: '1000-5000',
    address: '123 Innovation Drive, Tech City, TC 12345',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@techcorp.com',
    contactPhone: '+1 (555) 123-4567',
    website: 'https://www.techcorp.com',
    description: 'Leading technology company committed to sustainable e-waste management and environmental responsibility.',
    sustainabilityGoals: 'Achieve 100% e-waste recycling by 2025',
    notifications: true,
    monthlyReports: false
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
    alert('Corporate profile updated successfully!');
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Corporate Profile</h1>
      <p className="page-subtitle">Manage your organization's profile and settings</p>
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Company Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Company Information</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="form-label">Company Size *</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000-5000">1000-5000 employees</option>
                    <option value="5000+">5000+ employees</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="form-label">Company Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="form-label">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://www.company.com"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Contact Information</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label className="form-label">Primary Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Contact Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sustainability Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Sustainability Information</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label className="form-label">Company Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input"
                  rows={3}
                  placeholder="Describe your company's commitment to sustainability..."
                />
              </div>
              
              <div>
                <label className="form-label">Sustainability Goals</label>
                <textarea
                  name="sustainabilityGoals"
                  value={formData.sustainabilityGoals}
                  onChange={handleChange}
                  className="form-input"
                  rows={2}
                  placeholder="Your company's environmental and sustainability goals..."
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Preferences</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                <span>Email notifications for pickup schedules</span>
              </label>
              
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="monthlyReports"
                  checked={formData.monthlyReports}
                  onChange={handleChange}
                />
                <span>Receive monthly impact reports</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CorporateProfile;
