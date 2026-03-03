import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const CorporateTransactions = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Revenue',
      value: '$12,847',
      change: '+23% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-green'
    },
    {
      title: 'Avg. Transaction',
      value: '$54.89',
      change: '+12% from last month',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Payments',
      value: '$2,340',
      change: '+5% from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: '234',
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
      device: 'MacBook Pro 2020',
      recycler: 'Green Recycle Solutions',
      quantity: '15',
      amount: '$12,000',
      status: 'completed',
      date: '2024-01-15'
    },
    {
      id: '2',
      device: 'iPhone 13',
      recycler: 'EcoTech Processing',
      quantity: '25',
      amount: '$11,250',
      status: 'pending',
      date: '2024-01-14'
    },
    {
      id: '3',
      device: 'Dell Monitor',
      recycler: 'Sustainable Materials Co',
      quantity: '10',
      amount: '$1,200',
      status: 'completed',
      date: '2024-01-13'
    },
    {
      id: '4',
      device: 'iPad Air',
      recycler: 'City Recycling Center',
      quantity: '8',
      amount: '$2,240',
      status: 'processing',
      date: '2024-01-12'
    },
    {
      id: '5',
      device: 'HP Laptop',
      recycler: 'Digital Waste Solutions',
      quantity: '12',
      amount: '$3,840',
      status: 'completed',
      date: '2024-01-11'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'recycler', title: 'Recycler' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'amount', title: 'Amount' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'date', title: 'Transaction Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Transactions</h1>
      <p className="page-subtitle">View your organization's transaction history</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Transactions Table */}
      <DataTable
        title="Transaction History"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default CorporateTransactions;
