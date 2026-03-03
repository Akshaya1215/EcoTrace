import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DocumentTextIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const CorporateListings = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Listings',
      value: '234',
      change: '+18% from last month',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-green'
    },
    {
      title: 'Active Listings',
      value: '89',
      change: '+12% from last month',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Review',
      value: '23',
      change: '+5% from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: '122',
      change: '+25% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'MacBook Pro 2020',
      department: 'Engineering',
      quantity: '15',
      status: 'active',
      listed: '2024-01-15',
      value: '$12,000'
    },
    {
      id: '2',
      device: 'iPhone 13',
      department: 'Sales',
      quantity: '25',
      status: 'pending',
      listed: '2024-01-14',
      value: '$11,250'
    },
    {
      id: '3',
      device: 'Dell Monitor',
      department: 'Marketing',
      quantity: '10',
      status: 'active',
      listed: '2024-01-13',
      value: '$1,200'
    },
    {
      id: '4',
      device: 'iPad Air',
      department: 'HR',
      quantity: '8',
      status: 'completed',
      listed: '2024-01-12',
      value: '$2,240'
    },
    {
      id: '5',
      device: 'HP Laptop',
      department: 'Finance',
      quantity: '12',
      status: 'active',
      listed: '2024-01-11',
      value: '$3,840'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'department', title: 'Department' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'value', title: 'Total Value' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'listed', title: 'Listed Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">My Listings</h1>
      <p className="page-subtitle">Manage your organization's device listings</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Listings Table */}
      <DataTable
        title="Device Listings"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default CorporateListings;
