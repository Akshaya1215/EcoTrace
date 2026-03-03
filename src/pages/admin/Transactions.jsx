import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Transactions = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Revenue',
      value: '$124,847',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-green'
    },
    {
      title: 'Avg. Transaction',
      value: '$38.47',
      change: '+12% from last month',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Payments',
      value: '$12,450',
      change: '+5% from last week',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: '3,247',
      change: '+15% from last month',
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
      buyer: 'Alice Johnson',
      seller: 'John Smith',
      amount: '$450',
      status: 'completed',
      date: '2024-01-15',
      method: 'Credit Card'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      buyer: 'Bob Wilson',
      seller: 'Tech Corp',
      amount: '$800',
      status: 'pending',
      date: '2024-01-14',
      method: 'PayPal'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      buyer: 'Carol Davis',
      seller: 'Sarah Johnson',
      amount: '$320',
      status: 'completed',
      date: '2024-01-13',
      method: 'Bank Transfer'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      buyer: 'David Brown',
      seller: 'Mike Davis',
      amount: '$280',
      status: 'completed',
      date: '2024-01-12',
      method: 'Credit Card'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      buyer: 'Eve Martinez',
      seller: 'Emily Wilson',
      amount: '$650',
      status: 'processing',
      date: '2024-01-11',
      method: 'PayPal'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device' },
    { key: 'buyer', title: 'Buyer' },
    { key: 'seller', title: 'Seller' },
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
    { key: 'date', title: 'Date' },
    { key: 'method', title: 'Payment Method' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">All Transactions</h1>
      <p className="page-subtitle">Monitor platform transactions and revenue</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Transactions Table */}
      <DataTable
        title="Platform Transactions"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Transactions;
