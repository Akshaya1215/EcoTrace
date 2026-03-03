import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Payments = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Payments Pending',
      value: '$12,450',
      change: '+8% from last week',
      changeType: 'positive',
      icon: ClockIcon,
      color: 'eco-blue'
    },
    {
      title: 'Processing',
      value: '$3,280',
      change: '+5% from yesterday',
      changeType: 'neutral',
      icon: ExclamationTriangleIcon,
      color: 'eco-orange'
    },
    {
      title: 'Paid This Month',
      value: '$45,670',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Revenue',
      value: '$67,890',
      change: '+23% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'iPhone 12 Pro',
      seller: 'John Smith',
      amount: '$6,750',
      status: 'pending',
      dueDate: '2024-01-20',
      acceptedDate: '2024-01-15'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      seller: 'Tech Corp',
      amount: '$6,400',
      status: 'processing',
      dueDate: '2024-01-19',
      acceptedDate: '2024-01-14'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      seller: 'Sarah Johnson',
      amount: '$3,840',
      status: 'paid',
      dueDate: '2024-01-18',
      acceptedDate: '2024-01-13'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      seller: 'Mike Davis',
      amount: '$2,800',
      status: 'paid',
      dueDate: '2024-01-17',
      acceptedDate: '2024-01-12'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      seller: 'Emily Wilson',
      amount: '$3,900',
      status: 'pending',
      dueDate: '2024-01-21',
      acceptedDate: '2024-01-11'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
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
    { key: 'dueDate', title: 'Due Date' },
    { key: 'acceptedDate', title: 'Accepted Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Payments</h1>
      <p className="page-subtitle">Manage payments to sellers and financial transactions</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Payments Table */}
      <DataTable
        title="Payment Schedule"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Payments;
