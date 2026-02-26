import React from 'react';
import SummaryCard from '../../components/SummaryCard';
import CustomLineChart from '../../components/LineChart';
import CustomBarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import { 
  UserGroupIcon, 
  DevicePhoneMobileIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Dummy data for summary cards
  const summaryData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+15% from last month',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'eco-green'
    },
    {
      title: 'Devices Processed',
      value: '5,234',
      change: '+23% from last month',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-blue'
    },
    {
      title: 'Platform Revenue',
      value: '$12,450',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Active Transactions',
      value: '156',
      change: '+8% from yesterday',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1800 },
    { name: 'Mar', value: 2400 },
    { name: 'Apr', value: 3200 },
    { name: 'May', value: 4100 },
    { name: 'Jun', value: 5200 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Individual', value: 1847 },
    { name: 'Corporate', value: 567 },
    { name: 'Recycler', value: 234 },
    { name: 'Admin', value: 45 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      user: 'John Doe',
      email: 'john@example.com',
      role: 'Individual',
      status: 'Active',
      joined: '2024-01-15'
    },
    {
      id: '2',
      user: 'Tech Corp',
      email: 'admin@techcorp.com',
      role: 'Corporate',
      status: 'Active',
      joined: '2024-01-12'
    },
    {
      id: '3',
      user: 'Green Recycle',
      email: 'contact@greenrecycle.com',
      role: 'Recycler',
      status: 'Pending',
      joined: '2024-01-10'
    },
    {
      id: '4',
      user: 'Sarah Smith',
      email: 'sarah@example.com',
      role: 'Individual',
      status: 'Active',
      joined: '2024-01-08'
    },
    {
      id: '5',
      user: 'ABC Company',
      email: 'it@abc.com',
      role: 'Corporate',
      status: 'Active',
      joined: '2024-01-05'
    }
  ];

  const tableColumns = [
    { key: 'user', title: 'User' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      )
    },
    { key: 'joined', title: 'Joined' }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Monitor platform operations and user activity</p>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <CustomLineChart
          data={lineChartData}
          title="User Growth Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Users by Role"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Recent Users Table */}
      <DataTable
        title="Recent User Registrations"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default AdminDashboard;
