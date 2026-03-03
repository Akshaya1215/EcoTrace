import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // store selected role as userRole (optional when logging in)
    if (formData.role) {
      localStorage.setItem('userRole', formData.role);
    }
    // mark the user as authenticated so RoleBasedDashboard allows access
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header animate-fade-in">
          <div className="login-logo">
            <SparklesIcon />
          </div>
          <h1 className="login-title">EcoTrace AI</h1>
          <p className="login-subtitle">E-Waste Recycling Marketplace</p>
        </div>

        <div className="login-card animate-slide-up">
          <h2 className="page-title">Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Choose your role</option>
                <option value="individual">Individual User</option>
                <option value="corporate">Corporate User</option>
                <option value="recycler">Recycler</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-footer">
              <label className="form-checkbox">
                <input type="checkbox" />
                <span className="form-signup-text">Remember me</span>
              </label>
              <a href="#" className="form-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Sign In
            </button>
          </form>

          <div className="form-signup">
            <p className="form-signup-text">
              Don't have an account?{' '}
              <Link to="/role-select" className="form-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
