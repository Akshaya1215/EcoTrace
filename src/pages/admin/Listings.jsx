import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DocumentTextIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Listings = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Listings',
      value: '3,247',
      change: '+15% from last month',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-green'
    },
    {
      title: 'Active Listings',
      value: '1,847',
      change: '+12% from last month',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Review',
      value: '234',
      change: '+8% from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: '1,166',
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
      type: 'Individual',
      price: '$450',
      status: 'active',
      listed: '2024-01-15',
      views: '234'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      seller: 'Tech Corp',
      type: 'Corporate',
      price: '$800',
      status: 'pending',
      listed: '2024-01-14',
      views: '567'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      seller: 'Sarah Johnson',
      type: 'Individual',
      price: '$320',
      status: 'active',
      listed: '2024-01-13',
      views: '189'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      seller: 'Mike Davis',
      type: 'Individual',
      price: '$280',
      status: 'completed',
      listed: '2024-01-12',
      views: '145'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      seller: 'Emily Wilson',
      type: 'Individual',
      price: '$650',
      status: 'active',
      listed: '2024-01-11',
      views: '423'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device' },
    { key: 'seller', title: 'Seller' },
    { key: 'type', title: 'Seller Type' },
    { key: 'price', title: 'Price' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'listed', title: 'Listed Date' },
    { key: 'views', title: 'Views' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">All Listings</h1>
      <p className="page-subtitle">Monitor and manage platform listings</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Listings Table */}
      <DataTable
        title="Platform Listings"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Listings;
