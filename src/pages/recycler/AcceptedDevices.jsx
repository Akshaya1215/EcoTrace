import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CheckCircleIcon, TruckIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const AcceptedDevices = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Accepted Devices',
      value: '234',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-green'
    },
    {
      title: 'In Transit',
      value: '45',
      change: '+12% from last week',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-blue'
    },
    {
      title: 'Processing',
      value: '67',
      change: '+8% from yesterday',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: '122',
      change: '+23% from last month',
      changeType: 'positive',
      icon: ArrowPathIcon,
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
      status: 'in_transit',
      accepted: '2024-01-15',
      estimatedArrival: '2024-01-17',
      value: '$6,750'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      seller: 'Tech Corp',
      quantity: '8',
      status: 'processing',
      accepted: '2024-01-14',
      estimatedArrival: '2024-01-14',
      value: '$6,400'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      seller: 'Sarah Johnson',
      quantity: '12',
      status: 'processing',
      accepted: '2024-01-13',
      estimatedArrival: '2024-01-13',
      value: '$3,840'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      seller: 'Mike Davis',
      quantity: '10',
      status: 'completed',
      accepted: '2024-01-12',
      estimatedArrival: '2024-01-12',
      value: '$2,800'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      seller: 'Emily Wilson',
      quantity: '6',
      status: 'in_transit',
      accepted: '2024-01-11',
      estimatedArrival: '2024-01-13',
      value: '$3,900'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'seller', title: 'Seller' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'value', title: 'Total Value' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.replace('_', '').toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </span>
      )
    },
    { key: 'accepted', title: 'Accepted Date' },
    { key: 'estimatedArrival', title: 'Est. Arrival' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Accepted Devices</h1>
      <p className="page-subtitle">Track devices you've accepted for recycling</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Accepted Devices Table */}
      <DataTable
        title="Accepted Device Inventory"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default AcceptedDevices;
