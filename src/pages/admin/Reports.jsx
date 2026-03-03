import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import { 
  DocumentTextIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const Reports = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Monthly Reports',
      value: '12',
      change: '+2 from last month',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-green'
    },
    {
      title: 'Data Accuracy',
      value: '98.5%',
      change: '+1.2% from last month',
      changeType: 'positive',
      icon: ChartBarIcon,
      color: 'eco-blue'
    },
    {
      title: 'Growth Rate',
      value: '23%',
      change: '+5% from last month',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Global Reach',
      value: '47',
      change: '+8 countries',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'eco-purple'
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
    { name: 'Individual', value: 2347 },
    { name: 'Corporate', value: 567 },
    { name: 'Recycler', value: 234 },
    { name: 'Admin', value: 12 }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Platform Reports</h1>
      <p className="page-subtitle">Analytics and insights for platform performance</p>
      
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
          title="Monthly Revenue Growth"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="User Distribution by Type"
          dataKey="value"
          fillColor="#3b82f6"
        />
      </div>

      {/* Report Sections */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 className="card-title">Available Reports</h3>
        <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Monthly Performance Report</h4>
              <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>Complete platform metrics and KPIs</p>
            </div>
            <button className="btn btn-secondary">Download</button>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>User Analytics Report</h4>
              <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>User growth and engagement metrics</p>
            </div>
            <button className="btn btn-secondary">Download</button>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Environmental Impact Report</h4>
              <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>CO₂ savings and sustainability metrics</p>
            </div>
            <button className="btn btn-secondary">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
