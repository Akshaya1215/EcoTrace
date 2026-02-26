import React from 'react';
import SummaryCard from '../../components/SummaryCard';
import CustomLineChart from '../../components/LineChart';
import CustomBarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import { 
  TruckIcon, 
  CurrencyDollarIcon, 
  ArrowPathIcon, 
  BuildingOfficeIcon 
} from '@heroicons/react/24/outline';

const RecyclerDashboard = () => {
  // Dummy data for summary cards
  const summaryData = [
    {
      title: 'Active Orders',
      value: '18',
      change: '+25% from last week',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Revenue',
      value: '$8,234',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-blue'
    },
    {
      title: 'Materials Processed',
      value: '2.4 tons',
      change: '+32% from last month',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Pending Pickups',
      value: '7',
      change: '-2 from yesterday',
      changeType: 'negative',
      icon: BuildingOfficeIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Week 1', value: 1200 },
    { name: 'Week 2', value: 1800 },
    { name: 'Week 3', value: 2400 },
    { name: 'Week 4', value: 3200 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Copper', value: 450 },
    { name: 'Aluminum', value: 320 },
    { name: 'Gold', value: 180 },
    { name: 'Silver', value: 95 },
    { name: 'Plastic', value: 280 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      customer: 'Tech Corp',
      devices: '15 laptops',
      date: '2024-01-15',
      status: 'Processing',
      value: '$450'
    },
    {
      id: '2',
      customer: 'John Doe',
      devices: 'iPhone 12 Pro',
      date: '2024-01-14',
      status: 'Completed',
      value: '$85'
    },
    {
      id: '3',
      customer: 'ABC Company',
      devices: 'Desktop PCs',
      date: '2024-01-13',
      status: 'Pending',
      value: '$320'
    },
    {
      id: '4',
      customer: 'Sarah Smith',
      devices: 'iPad Pro',
      date: '2024-01-12',
      status: 'Processing',
      value: '$65'
    },
    {
      id: '5',
      customer: 'Global Tech',
      devices: 'Server equipment',
      date: '2024-01-11',
      status: 'Completed',
      value: '$1,200'
    }
  ];

  const tableColumns = [
    { key: 'customer', title: 'Customer' },
    { key: 'devices', title: 'Devices' },
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
    { key: 'value', title: 'Value' }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Recycler Dashboard</h1>
        <p className="page-subtitle">Manage your recycling operations and track revenue</p>
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
          title="Weekly Revenue Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Materials Recovered"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Recent Orders Table */}
      <DataTable
        title="Recent Orders"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default RecyclerDashboard;
