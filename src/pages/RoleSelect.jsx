import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  ArrowPathIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const RoleSelect = () => {
  const navigate = useNavigate();
  const roles = [
    {
      id: 'seller',
      title: 'Individual User',
      description: 'Recycle personal electronics and track your environmental impact',
      icon: UserIcon
    },
    {
      id: 'corporate',
      title: 'Corporate User',
      description: 'Manage company e-waste recycling programs and compliance',
      icon: BuildingOfficeIcon
    },
    {
      id: 'recycler',
      title: 'Recycler',
      description: 'Process e-waste and manage recycling operations',
      icon: ArrowPathIcon
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Oversee platform operations and user management',
      icon: ShieldCheckIcon
    }
  ];

  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <div className="role-selection-header animate-fade-in">
          <div className="role-selection-logo">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="role-selection-title">Choose Your Role</h1>
          <p className="role-selection-subtitle">
            Select how you want to participate in the EcoTrace AI e-waste recycling marketplace
          </p>
        </div>

        <div className="role-cards-grid">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className="role-card animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  localStorage.setItem('userRole', role.id);
                  switch (role.id) {
                    case 'seller':
                      navigate('/dashboard');
                      break;
                    case 'corporate':
                      navigate('/corporate');
                      break;
                    case 'recycler':
                      navigate('/recycler');
                      break;
                    case 'admin':
                      navigate('/admin');
                      break;
                    default:
                      navigate('/dashboard');
                  }
                }}
              >
                <div className="role-card-icon">
                  <IconComponent />
                </div>
                <h3 className="role-card-title">
                  {role.title}
                </h3>
                <p className="role-card-description">
                  {role.description}
                </p>
                <div className="role-card-link">
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="form-signup-text">
            Select your role to get started with EcoTrace AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
