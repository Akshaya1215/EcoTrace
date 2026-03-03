import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Eco Street, Green City, GC 12345',
    bio: 'Passionate about e-waste recycling and environmental sustainability.',
    notifications: true,
    newsletter: false
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
    alert('Profile updated successfully!');
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Profile Settings</h1>
      <p className="page-subtitle">Manage your account settings</p>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                rows={2}
              />
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="card-title">Bio</h3>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-input"
              rows={4}
              placeholder="Tell us about yourself..."
            />
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
                <span>Email notifications for new transactions</span>
              </label>
              
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                <span>Subscribe to monthly newsletter</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button type="submit" className="btn btn-primary">
              Save Changes
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

export default ProfileSettings;
