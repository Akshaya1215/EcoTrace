import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DevicePhoneMobileIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const AvailableListings = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Available Devices',
      value: '89',
      change: '+12% from last week',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'New Today',
      value: '15',
      change: '+5 from yesterday',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'High Priority',
      value: '23',
      change: '+8% from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Total Value',
      value: '$45,670',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'iPhone 12 Pro',
      seller: 'John Smith',
      quantity: '15',
      price: '$450',
      condition: 'Good',
      location: 'New York, NY',
      listed: '2024-01-15',
      priority: 'high'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      seller: 'Tech Corp',
      quantity: '8',
      price: '$800',
      condition: 'Excellent',
      location: 'Los Angeles, CA',
      listed: '2024-01-14',
      priority: 'medium'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      seller: 'Sarah Johnson',
      quantity: '12',
      price: '$320',
      condition: 'Good',
      location: 'Chicago, IL',
      listed: '2024-01-13',
      priority: 'low'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      seller: 'Mike Davis',
      quantity: '10',
      price: '$280',
      condition: 'Fair',
      location: 'Houston, TX',
      listed: '2024-01-12',
      priority: 'medium'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      seller: 'Emily Wilson',
      quantity: '6',
      price: '$650',
      condition: 'Excellent',
      location: 'Phoenix, AZ',
      listed: '2024-01-11',
      priority: 'high'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'seller', title: 'Seller' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'price', title: 'Price/Unit' },
    { key: 'condition', title: 'Condition' },
    { key: 'location', title: 'Location' },
    { key: 'listed', title: 'Listed Date' },
    { 
      key: 'priority', 
      title: 'Priority',
      render: (priority) => (
        <span className={`status-badge ${priority}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Available Listings</h1>
      <p className="page-subtitle">Browse and accept available device listings for recycling</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Available Listings Table */}
      <DataTable
        title="Available Device Listings"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default AvailableListings;
