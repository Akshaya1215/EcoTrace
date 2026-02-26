import React from 'react';
import SummaryCard from '../../components/SummaryCard';
import CustomLineChart from '../../components/LineChart';
import CustomBarChart from '../../components/BarChart';
import DataTable from '../../components/DataTable';
import { 
  BuildingOfficeIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const CorporateDashboard = () => {
  // Dummy data for summary cards
  const summaryData = [
    {
      title: 'Devices Disposed',
      value: '156',
      change: '+18% from last quarter',
      changeType: 'positive',
      icon: BuildingOfficeIcon,
      color: 'eco-green'
    },
    {
      title: 'Carbon Offset',
      value: '2.4 tons',
      change: '+25% from last quarter',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'eco-blue'
    },
    {
      title: 'Cost Savings',
      value: '$12,450',
      change: '+15% from last quarter',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Compliance Score',
      value: '94%',
      change: '+3 points',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Q1', value: 45 },
    { name: 'Q2', value: 52 },
    { name: 'Q3', value: 78 },
    { name: 'Q4', value: 156 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Laptops', value: 45 },
    { name: 'Desktops', value: 38 },
    { name: 'Monitors', value: 32 },
    { name: 'Phones', value: 28 },
    { name: 'Servers', value: 13 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      department: 'IT Department',
      devices: 45,
      date: '2024-01-15',
      status: 'Completed',
      co2: '234kg'
    },
    {
      id: '2',
      department: 'Finance',
      devices: 12,
      date: '2024-01-12',
      status: 'Processing',
      co2: '67kg'
    },
    {
      id: '3',
      department: 'Marketing',
      devices: 8,
      date: '2024-01-10',
      status: 'Completed',
      co2: '45kg'
    },
    {
      id: '4',
      department: 'HR',
      devices: 6,
      date: '2024-01-08',
      status: 'Pending',
      co2: '34kg'
    },
    {
      id: '5',
      department: 'Operations',
      devices: 15,
      date: '2024-01-05',
      status: 'Completed',
      co2: '89kg'
    }
  ];

  const tableColumns = [
    { key: 'department', title: 'Department' },
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
    { key: 'co2', title: 'CO₂ Offset' }
  ];

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Corporate Dashboard</h1>
        <p className="page-subtitle">Manage company e-waste disposal and compliance</p>
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
          title="Quarterly Disposal Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Device Categories"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Department Activity Table */}
      <DataTable
        title="Department Disposal Activity"
        data={tableData}
        columns={tableColumns}
      />

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="btn btn-primary">
            Bulk Upload Devices
          </button>
          <button className="btn btn-secondary">
            Download Compliance Report
          </button>
          <button className="btn btn-secondary">
            Schedule Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorporateDashboard;
