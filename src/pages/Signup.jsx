import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [selectedRole] = useState(() => localStorage.getItem('selectedRole'));
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  if (!selectedRole) {
    return (
      <div className="signup-page">
        <div className="signup-container">
          <p>Please select your role before signing up.</p>
          <button className="btn" onClick={() => navigate('/role-select')}>Go to Role Selection</button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="page-title">Sign Up as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
