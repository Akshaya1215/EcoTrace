import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import DataTable from '../../components/ui/DataTable';
import { 
  DevicePhoneMobileIcon, 
  CurrencyDollarIcon, 
  SparklesIcon, 
  ArrowTrendingUpIcon,
  TruckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const CorporateDashboard = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Devices Submitted',
      value: '234',
      change: '+18% from last month',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Recycling Value',
      value: '$12,847',
      change: '+23% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-blue'
    },
    {
      title: 'CO₂ Saved',
      value: '1,234 kg',
      change: '+28% from last month',
      changeType: 'positive',
      icon: SparklesIcon,
      color: 'eco-emerald'
    },
    {
      title: 'ESG Score',
      value: '87/100',
      change: '+5 points',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-purple'
    },
    {
      title: 'Active Pickups',
      value: '12',
      change: '+3 this week',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-orange'
    }
  ];

  // Chart data
  const lineChartData = [
    { name: 'Jan', value: 1800 },
    { name: 'Feb', value: 2200 },
    { name: 'Mar', value: 2100 },
    { name: 'Apr', value: 2800 },
    { name: 'May', value: 2600 },
    { name: 'Jun', value: 3200 }
  ];

  const barChartData = [
    { name: 'Laptops', value: 89 },
    { name: 'Phones', value: 67 },
    { name: 'Tablets', value: 34 },
    { name: 'Desktops', value: 23 },
    { name: 'Monitors', value: 21 }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'MacBook Pro 2020',
      department: 'Engineering',
      submitted: '2024-01-15',
      status: 'picked_up',
      value: '$800',
      co2: '45kg'
    },
    {
      id: '2',
      device: 'iPhone 13',
      department: 'Sales',
      submitted: '2024-01-14',
      status: 'processing',
      value: '$450',
      co2: '12kg'
    },
    {
      id: '3',
      device: 'Dell Monitor',
      department: 'Marketing',
      submitted: '2024-01-13',
      status: 'completed',
      value: '$120',
      co2: '8kg'
    },
    {
      id: '4',
      device: 'iPad Air',
      department: 'HR',
      submitted: '2024-01-12',
      status: 'scheduled',
      value: '$280',
      co2: '6kg'
    },
    {
      id: '5',
      device: 'HP Laptop',
      department: 'Finance',
      submitted: '2024-01-11',
      status: 'processing',
      value: '$320',
      co2: '18kg'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device' },
    { key: 'department', title: 'Department' },
    { key: 'submitted', title: 'Submitted Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.replace('_', '').toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </span>
      )
    },
    { key: 'value', title: 'Value' },
    { key: 'co2', title: 'CO₂ Saved' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Corporate Dashboard</h1>
      <p className="page-subtitle">Manage your organization's e-waste recycling program</p>
      
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
          title="Monthly Recycling Value"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Device Types Submitted"
          dataKey="value"
          fillColor="#3b82f6"
        />
      </div>

      {/* Recent Submissions Table */}
      <DataTable
        title="Recent Device Submissions"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default CorporateDashboard;
