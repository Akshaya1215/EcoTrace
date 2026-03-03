import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import DataTable from '../../components/ui/DataTable';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Users',
      value: '8,547',
      change: '+23% from last month',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'eco-green'
    },
    {
      title: 'Corporate Accounts',
      value: '342',
      change: '+12% from last month',
      changeType: 'positive',
      icon: BuildingOfficeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Active Recyclers',
      value: '127',
      change: '+8% from last month',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Total Revenue',
      value: '$124,847',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-purple'
    },
    {
      title: 'Total Transactions',
      value: '3,247',
      change: '+15% from last month',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-orange'
    },
    {
      title: 'Platform CO₂ Impact',
      value: '12,847 kg',
      change: '+28% from last month',
      changeType: 'positive',
      icon: SparklesIcon,
      color: 'eco-teal'
    }
  ];

  // Chart data
  const lineChartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 6000 },
    { name: 'Mar', value: 5500 },
    { name: 'Apr', value: 8000 },
    { name: 'May', value: 7200 },
    { name: 'Jun', value: 9500 }
  ];

  const barChartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1800 },
    { name: 'Mar', value: 1600 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 2100 },
    { name: 'Jun', value: 2800 }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      user: 'John Smith',
      type: 'Individual',
      devices: '12',
      revenue: '$450',
      date: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      user: 'Tech Corp',
      type: 'Corporate',
      devices: '45',
      revenue: '$2,800',
      date: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      user: 'Green Recycle',
      type: 'Recycler',
      devices: '78',
      revenue: '$5,200',
      date: '2024-01-13',
      status: 'active'
    }
  ];

  const tableColumns = [
    { key: 'user', title: 'User/Organization' },
    { key: 'type', title: 'Type' },
    { key: 'devices', title: 'Devices' },
    { key: 'revenue', title: 'Revenue' },
    { key: 'date', title: 'Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Platform overview and management</p>
      
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
          title="Monthly Transactions"
          dataKey="value"
          fillColor="#3b82f6"
        />
      </div>

      {/* Recent Activity Table */}
      <DataTable
        title="Recent Platform Activity"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default AdminDashboard;
