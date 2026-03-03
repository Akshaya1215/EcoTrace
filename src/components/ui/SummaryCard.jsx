import React from 'react';

const SummaryCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-eco-green-600';
      case 'negative':
        return 'text-eco-red-600';
      default:
        return 'text-eco-gray-600';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'eco-green':
        return 'bg-eco-green-100 text-eco-green-600';
      case 'eco-blue':
        return 'bg-eco-blue-100 text-eco-blue-600';
      case 'eco-emerald':
        return 'bg-eco-emerald-100 text-eco-emerald-600';
      case 'eco-purple':
        return 'bg-eco-purple-100 text-eco-purple-600';
      case 'eco-orange':
        return 'bg-eco-orange-100 text-eco-orange-600';
      case 'eco-teal':
        return 'bg-eco-teal-100 text-eco-teal-600';
      default:
        return 'bg-eco-gray-100 text-eco-gray-600';
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <div className={`card-icon ${getColorClass()}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="card-info">
            <p className="card-title">{title}</p>
            <p className="card-value">{value}</p>
          </div>
        </div>
        <div className="card-footer">
          <span className={`card-change ${getChangeColor()}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
