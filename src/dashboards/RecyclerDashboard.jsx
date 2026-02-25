import React from 'react';
import SummaryCard from '../components/SummaryCard';
import CustomLineChart from '../components/LineChart';
import CustomBarChart from '../components/BarChart';
import DataTable from '../components/DataTable';
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
      title: 'Total Processed',
      value: '1,247 kg',
      change: '+18% from last month',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-green'
    },
    {
      title: 'Revenue',
      value: '$12,450',
      change: '+15% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-blue'
    },
    {
      title: 'Materials Recovered',
      value: '892 kg',
      change: '+22% from last month',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Active Partners',
      value: '34',
      change: '+4 new partners',
      changeType: 'positive',
      icon: BuildingOfficeIcon,
      color: 'eco-purple'
    }
  ];

  // Dummy data for line chart
  const lineChartData = [
    { name: 'Jan', value: 8500 },
    { name: 'Feb', value: 9200 },
    { name: 'Mar', value: 10100 },
    { name: 'Apr', value: 11200 },
    { name: 'May', value: 11800 },
    { name: 'Jun', value: 12450 }
  ];

  // Dummy data for bar chart
  const barChartData = [
    { name: 'Copper', value: 245 },
    { name: 'Aluminum', value: 189 },
    { name: 'Gold', value: 12 },
    { name: 'Silver', value: 8 },
    { name: 'Plastic', value: 156 }
  ];

  // Dummy data for table
  const tableData = [
    {
      id: '1',
      partner: 'TechCorp Industries',
      date: '2024-01-15',
      material: 'Electronics',
      weight: '125 kg',
      status: 'Completed',
      revenue: '$1,250'
    },
    {
      id: '2',
      partner: 'City Municipal Office',
      date: '2024-01-14',
      material: 'Computers',
      weight: '89 kg',
      status: 'Processing',
      revenue: '$890'
    },
    {
      id: '3',
      partner: 'GreenTech Solutions',
      date: '2024-01-13',
      material: 'Mobile Phones',
      weight: '45 kg',
      status: 'Completed',
      revenue: '$675'
    },
    {
      id: '4',
      partner: 'EduTech University',
      date: '2024-01-12',
      material: 'Lab Equipment',
      weight: '167 kg',
      status: 'Completed',
      revenue: '$2,005'
    },
    {
      id: '5',
      partner: 'RetailChain Inc',
      date: '2024-01-11',
      material: 'Display Units',
      weight: '78 kg',
      status: 'Pending',
      revenue: '$780'
    }
  ];

  const tableColumns = [
    { key: 'partner', title: 'Partner' },
    { key: 'date', title: 'Date' },
    { key: 'material', title: 'Material Type' },
    { key: 'weight', title: 'Weight' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'Completed' 
            ? 'bg-eco-green-100 text-eco-green-800'
            : status === 'Processing'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-eco-gray-100 text-eco-gray-800'
        }`}>
          {status}
        </span>
      )
    },
    { key: 'revenue', title: 'Revenue' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-eco-gray-900">Recycler Dashboard</h1>
        <p className="text-eco-gray-600 mt-1">Manage your recycling operations and track business performance</p>
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
          title="Monthly Revenue Trend"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="Materials Recovered (kg)"
          dataKey="value"
          fillColor="#16a34a"
        />
      </div>

      {/* Recent Processing Table */}
      <DataTable
        title="Recent Processing Orders"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default RecyclerDashboard;
