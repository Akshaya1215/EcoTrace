import React from 'react';
import SummaryCard from '../components/SummaryCard';
import CustomLineChart from '../components/LineChart';
import CustomBarChart from '../components/BarChart';
import DataTable from '../components/DataTable';
import { 
  DevicePhoneMobileIcon, 
  CurrencyDollarIcon, 
  SparklesIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const IndividualDashboard = () => {
  // Dummy data for summary cards
  const summaryData = [
    {
      title: 'Devices Recycled',
      value: '24',
      change: '+12% from last month',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Earnings',
      value: '$1,847',
      change: '+8% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-blue'
    },
    {
      title: 'CO₂ Saved',
      value: '156 kg',
      change: '+23% from last month',
      changeType: 'positive',
      icon: SparklesIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Impact Score',
      value: '892',
      change: '+45 points',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 450 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 650 },
    { name: 'Jun', value: 900 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Phones', value: 12 },
    { name: 'Laptops', value: 8 },
    { name: 'Tablets', value: 4 },
    { name: 'Monitors', value: 6 },
    { name: 'Others', value: 3 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      device: 'iPhone 12 Pro',
      date: '2024-01-15',
      status: 'Completed',
      earnings: '$85',
      co2: '12kg'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      date: '2024-01-10',
      status: 'Processing',
      earnings: '$120',
      co2: '18kg'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      date: '2024-01-08',
      status: 'Completed',
      earnings: '$65',
      co2: '8kg'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      date: '2024-01-05',
      status: 'Completed',
      earnings: '$70',
      co2: '10kg'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      date: '2024-01-03',
      status: 'Pending',
      earnings: '$95',
      co2: '15kg'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device' },
    { key: 'date', title: 'Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      )
    },
    { key: 'earnings', title: 'Earnings' },
    { key: 'co2', title: 'CO₂ Saved' }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Individual Dashboard</h1>
        <p className="page-subtitle">Track your e-waste recycling impact and earnings</p>
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
          title="Monthly Earnings Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Devices by Category"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Recent Activity Table */}
      <DataTable
        title="Recent Recycling Activity"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default IndividualDashboard;
