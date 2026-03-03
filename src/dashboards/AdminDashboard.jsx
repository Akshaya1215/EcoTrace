import React from 'react';
import SummaryCard from '../components/SummaryCard';
import CustomLineChart from '../components/LineChart';
import CustomBarChart from '../components/BarChart';
import DataTable from '../components/DataTable';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  // Dummy data for summary cards
  const summaryData = [
    {
      title: 'Total Users',
      value: '8,547',
      change: '+23% from last month',
      changeType: 'positive',
      icon: UsersIcon,
      color: 'eco-green'
    },
    {
      title: 'Active Recyclers',
      value: '156',
      change: '+12% from last month',
      changeType: 'positive',
      icon: BuildingOfficeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Platform Revenue',
      value: '$45,280',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Total CO₂ Saved',
      value: '12.5 tons',
      change: '+31% from last month',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Jan', value: 32000 },
    { name: 'Feb', value: 35000 },
    { name: 'Mar', value: 38000 },
    { name: 'Apr', value: 41000 },
    { name: 'May', value: 43500 },
    { name: 'Jun', value: 45280 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Individual', value: 6847 },
    { name: 'Corporate', value: 1245 },
    { name: 'Recycler', value: 156 },
    { name: 'Admin', value: 12 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      name: 'TechCorp Industries',
      type: 'Corporate',
      joinDate: '2024-01-15',
      status: 'Active',
      devices: '245',
      revenue: '$12,450'
    },
    {
      id: '2',
      name: 'John Smith',
      type: 'Individual',
      joinDate: '2024-01-14',
      status: 'Active',
      devices: '12',
      revenue: '$847'
    },
    {
      id: '3',
      name: 'Green Recycling Co',
      type: 'Recycler',
      joinDate: '2024-01-13',
      status: 'Active',
      devices: '1,247',
      revenue: '$18,920'
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      type: 'Individual',
      joinDate: '2024-01-12',
      status: 'Pending',
      devices: '3',
      revenue: '$125'
    },
    {
      id: '5',
      name: 'City Municipal Office',
      type: 'Corporate',
      joinDate: '2024-01-11',
      status: 'Active',
      devices: '89',
      revenue: '$5,340'
    }
  ];

  const tableColumns = [
    { key: 'name', title: 'Organization/User' },
    { key: 'type', title: 'Type' },
    { key: 'joinDate', title: 'Join Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Active' 
            ? 'bg-eco-green-100 text-eco-green-800'
            : status === 'Pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'devices', title: 'Devices' },
    { key: 'revenue', title: 'Revenue' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-eco-gray-900">Admin Dashboard</h1>
        <p className="text-eco-gray-600 mt-1">Platform overview and system management</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomLineChart
          data={lineChartData}
          title="Platform Revenue Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Users by Type"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Recent Users Table */}
      <DataTable
        title="Recent Platform Activity"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default AdminDashboard;
