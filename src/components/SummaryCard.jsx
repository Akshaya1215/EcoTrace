import React from 'react';

const SummaryCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  const getIconBgColor = () => {
    switch(color) {
      case 'eco-green': return '#f0fdf4';
      case 'eco-blue': return '#eff6ff';
      case 'eco-emerald': return '#ecfdf5';
      case 'eco-purple': return '#faf5ff';
      default: return '#f1f5f9';
    }
  };

  const getIconColor = () => {
    switch(color) {
      case 'eco-green': return '#16a34a';
      case 'eco-blue': return '#2563eb';
      case 'eco-emerald': return '#10b981';
      case 'eco-purple': return '#9333ea';
      default: return '#475569';
    }
  };

  return (
    <div className="summary-card">
      <div className="summary-card-content">
        <div className="summary-info">
          <p className="summary-label">{title}</p>
          <p className="summary-value">{value}</p>
          {change && (
            <div className={`summary-change ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
              {isPositive && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              )}
              {isNegative && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div 
          className="summary-icon"
          style={{ backgroundColor: getIconBgColor() }}
        >
          <Icon style={{ color: getIconColor() }} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
