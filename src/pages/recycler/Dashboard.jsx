import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import DataTable from '../../components/ui/DataTable';
import { 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const RecyclerDashboard = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Devices Available',
      value: '89',
      change: '+12% from last week',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'Devices Accepted',
      value: '234',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-blue'
    },
    {
      title: 'Processing Queue',
      value: '45',
      change: '+5% from yesterday',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Payments Pending',
      value: '$12,450',
      change: '+8% from last week',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-purple'
    },
    {
      title: 'Revenue Generated',
      value: '$67,890',
      change: '+23% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Materials Extracted',
      value: '1,234 kg',
      change: '+15% from last month',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-teal'
    }
  ];

  // Chart data
  const lineChartData = [
    { name: 'Jan', value: 8000 },
    { name: 'Feb', value: 12000 },
    { name: 'Mar', value: 11000 },
    { name: 'Apr', value: 16000 },
    { name: 'May', value: 14000 },
    { name: 'Jun', value: 18000 }
  ];

  const barChartData = [
    { name: 'Gold', value: 234 },
    { name: 'Silver', value: 189 },
    { name: 'Copper', value: 156 },
    { name: 'Aluminum', value: 123 },
    { name: 'Plastic', value: 89 }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'iPhone 12 Pro',
      seller: 'John Smith',
      quantity: '15',
      status: 'available',
      listed: '2024-01-15',
      value: '$6,750'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      seller: 'Tech Corp',
      quantity: '8',
      status: 'accepted',
      listed: '2024-01-14',
      value: '$6,400'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      seller: 'Sarah Johnson',
      quantity: '12',
      status: 'processing',
      listed: '2024-01-13',
      value: '$3,840'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      seller: 'Mike Davis',
      quantity: '10',
      status: 'available',
      listed: '2024-01-12',
      value: '$2,800'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      seller: 'Emily Wilson',
      quantity: '6',
      status: 'completed',
      listed: '2024-01-11',
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
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'listed', title: 'Listed Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Recycler Dashboard</h1>
      <p className="page-subtitle">Manage your recycling operations and processing workflow</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <CustomLineChart
          data={lineChartData}
          title="Monthly Revenue Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Materials Extracted (kg)"
          dataKey="value"
          fillColor="#3b82f6"
        />
      </div>

      {/* Recent Activity Table */}
      <DataTable
        title="Recent Device Activity"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default RecyclerDashboard;
