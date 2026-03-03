import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { TruckIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Recyclers = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Recyclers',
      value: '127',
      change: '+8% from last month',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-green'
    },
    {
      title: 'Approved',
      value: '98',
      change: '+5% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Approval',
      value: '18',
      change: '+3 from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Total Revenue',
      value: '$124,847',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-purple'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      name: 'Green Recycle Solutions',
      email: 'contact@greenrecycle.com',
      location: 'New York, NY',
      status: 'approved',
      devices: '234',
      revenue: '$12,450',
      joined: '2024-01-15'
    },
    {
      id: '2',
      name: 'EcoTech Processing',
      email: 'info@ecotech.com',
      location: 'Los Angeles, CA',
      status: 'pending',
      devices: '45',
      revenue: '$2,800',
      joined: '2024-01-10'
    },
    {
      id: '3',
      name: 'Sustainable Materials Co',
      email: 'hello@susmat.com',
      location: 'Chicago, IL',
      status: 'approved',
      devices: '189',
      revenue: '$9,230',
      joined: '2024-01-08'
    },
    {
      id: '4',
      name: 'City Recycling Center',
      email: 'admin@cityrecycle.gov',
      location: 'Houston, TX',
      status: 'approved',
      devices: '567',
      revenue: '$28,900',
      joined: '2024-01-05'
    },
    {
      id: '5',
      name: 'Digital Waste Solutions',
      email: 'support@digitalwaste.com',
      location: 'Phoenix, AZ',
      status: 'suspended',
      devices: '12',
      revenue: '$450',
      joined: '2024-01-03'
    }
  ];

  const tableColumns = [
    { key: 'name', title: 'Company Name' },
    { key: 'email', title: 'Email' },
    { key: 'location', title: 'Location' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'devices', title: 'Devices Processed' },
    { key: 'revenue', title: 'Revenue' },
    { key: 'joined', title: 'Joined Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Recycler Approvals</h1>
      <p className="page-subtitle">Manage recycler applications and approvals</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Recyclers Table */}
      <DataTable
        title="Recycler Applications"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Recyclers;
