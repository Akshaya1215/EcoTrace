import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import { 
  SparklesIcon, 
  TrophyIcon, 
  ArrowTrendingUpIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const ImpactReports = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total CO₂ Saved',
      value: '1,234 kg',
      change: '+28% from last month',
      changeType: 'positive',
      icon: SparklesIcon,
      color: 'eco-green'
    },
    {
      title: 'ESG Score',
      value: '87/100',
      change: '+5 points',
      changeType: 'positive',
      icon: TrophyIcon,
      color: 'eco-blue'
    },
    {
      title: 'Trees Equivalent',
      value: '56',
      change: '+12 this month',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Recycling Rate',
      value: '94%',
      change: '+3% from last month',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-purple'
    }
  ];

  // Chart data
  const lineChartData = [
    { name: 'Jan', value: 180 },
    { name: 'Feb', value: 220 },
    { name: 'Mar', value: 210 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 260 },
    { name: 'Jun', value: 320 }
  ];

  const barChartData = [
    { name: 'Laptops', value: 456 },
    { name: 'Phones', value: 234 },
    { name: 'Tablets', value: 123 },
    { name: 'Desktops', value: 189 },
    { name: 'Monitors', value: 232 }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Impact Reports</h1>
      <p className="page-subtitle">Track your organization's environmental impact and ESG metrics</p>
      
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
          title="Monthly CO₂ Impact (kg)"
          dataKey="value"
          strokeColor="#22c55e"
        />
        <CustomBarChart
          data={barChartData}
          title="CO₂ Saved by Device Type (kg)"
          dataKey="value"
          fillColor="#3b82f6"
        />
      </div>

      {/* ESG Metrics */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 className="card-title">ESG Performance Metrics</h3>
        <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Environmental Score</span>
              <span style={{ color: '#64748b' }}>92/100</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '92%',
                height: '100%',
                backgroundColor: '#22c55e',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Social Score</span>
              <span style={{ color: '#64748b' }}>85/100</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '85%',
                height: '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Governance Score</span>
              <span style={{ color: '#64748b' }}>88/100</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '88%',
                height: '100%',
                backgroundColor: '#f59e0b',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Certification Badges */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 className="card-title">Environmental Certifications</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <TrophyIcon className="w-8 h-8 text-eco-green-600" />
            </div>
            <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>ISO 14001</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>Environmental Management</p>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <GlobeAltIcon className="w-8 h-8 text-eco-blue-600" />
            </div>
            <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Carbon Neutral</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>2024 Certified</p>
          </div>
          
          <div style={{ 
            padding: '16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <SparklesIcon className="w-8 h-8 text-eco-emerald-600" />
            </div>
            <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>E-Waste Champion</h4>
            <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>Industry Leader</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReports;
