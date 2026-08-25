import React, { useState, useEffect } from 'react';
import { UserIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getProfile, updateProfile } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    notifications: true,
    newsletter: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProfile(currentUser.id);
        if (data) {
          // split name into first and last name if available
          const nameParts = (data.name || '').split(' ');
          const fName = nameParts[0] || '';
          const lName = nameParts.slice(1).join(' ') || '';
          
          setFormData({
            firstName: data.firstName || fName || 'John',
            lastName: data.lastName || lName || 'Doe',
            email: data.email || currentUser.email,
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || '',
            notifications: data.notifications !== undefined ? data.notifications : true,
            newsletter: data.newsletter !== undefined ? data.newsletter : false
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Loading default values.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`.strip ? `${formData.firstName} ${formData.lastName}`.trim() : `${formData.firstName} ${formData.lastName}`
      };
      await updateProfile(currentUser.id, payload);
      setSuccess(true);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Profile Settings</h1>
      <p className="page-subtitle">Manage your account settings</p>
      
      {error && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 20px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto 20px', background: '#ecfdf5', color: '#15803d', border: '1px solid #dcfce7', padding: '15px', borderRadius: '8px' }}>
          ✅ Profile updated successfully!
        </div>
      )}

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <p style={{ color: "#6b7280" }}>Loading profile details...</p>
          </div>
        ) : (
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
                  required
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
              <button type="button" onClick={() => window.location.reload()} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
