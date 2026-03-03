import React, { useState } from 'react';
import { BuildingOfficeIcon, UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const RecyclerProfile = () => {
  const [formData, setFormData] = useState({
    companyName: 'Green Recycle Solutions',
    licenseNumber: 'REC-2024-12345',
    businessType: 'Certified E-Waste Recycler',
    address: '123 Recycling Lane, Green City, GC 12345',
    contactPerson: 'John Smith',
    contactEmail: 'john.smith@greenrecycle.com',
    contactPhone: '+1 (555) 123-4567',
    website: 'https://www.greenrecycle.com',
    established: '2015',
    capacity: '10000 kg/month',
    certifications: 'ISO 14001, R2, e-Stewards',
    description: 'Leading certified e-waste recycling company committed to environmental sustainability and responsible material recovery.',
    serviceAreas: 'New York, New Jersey, Connecticut, Pennsylvania',
    notifications: true,
    weeklyReports: true
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
    alert('Recycler profile updated successfully!');
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Recycler Profile</h1>
      <p className="page-subtitle">Manage your recycling business profile and credentials</p>
      
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Business Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Business Information</h3>
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
                  <label className="form-label">License Number *</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Business Type *</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Certified E-Waste Recycler">Certified E-Waste Recycler</option>
                    <option value="Electronic Scrap Processor">Electronic Scrap Processor</option>
                    <option value="IT Asset Disposition">IT Asset Disposition</option>
                    <option value="Metal Recovery">Metal Recovery</option>
                    <option value="Refurbishment Center">Refurbishment Center</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="form-label">Business Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                  rows={2}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="form-label">Established Year</label>
                  <input
                    type="text"
                    name="established"
                    value={formData.established}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                
                <div>
                  <label className="form-label">Processing Capacity</label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 10000 kg/month"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Certifications</label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., ISO 14001, R2, e-Stewards"
                />
              </div>
              
              <div>
                <label className="form-label">Service Areas</label>
                <input
                  type="text"
                  name="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="States or regions you serve"
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

          {/* Company Description */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Company Description</h3>
            <div>
              <label className="form-label">Business Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows={4}
                placeholder="Describe your recycling business, services, and commitment to sustainability..."
              />
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
                <span>Email notifications for new listings</span>
              </label>
              
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="weeklyReports"
                  checked={formData.weeklyReports}
                  onChange={handleChange}
                />
                <span>Receive weekly performance reports</span>
              </label>
            </div>
          </div>

          {/* Certification Status */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Certification Status</h3>
            <div style={{ 
              padding: '16px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #22c55e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShieldCheckIcon className="w-6 h-6 text-eco-green-600" />
                <div>
                  <p style={{ margin: '0', fontWeight: '600', color: '#16a34a' }}>
                    Fully Certified Recycler
                  </p>
                  <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
                    All certifications are current and valid until December 2024
                  </p>
                </div>
              </div>
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

export default RecyclerProfile;
