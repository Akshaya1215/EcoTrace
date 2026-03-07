import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BuildingOfficeIcon,
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Logo3D from '../components/Logo3D';

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
            <Logo3D className="w-[80%] h-[80%]" />
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
