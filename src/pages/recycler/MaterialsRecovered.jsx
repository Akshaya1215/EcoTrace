import React from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomBarChart from '../../components/ui/BarChart';
import CustomLineChart from '../../components/ui/LineChart';
import { 
  ArrowPathIcon, 
  ArrowTrendingUpIcon, 
  CurrencyDollarIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

const MaterialsRecovered = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Materials',
      value: '1,234 kg',
      change: '+15% from last month',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-green'
    },
    {
      title: 'This Month',
      value: '234 kg',
      change: '+8% from last month',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-blue'
    },
    {
      title: 'Material Value',
      value: '$45,670',
      change: '+18% from last month',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Recovery Rate',
      value: '87%',
      change: '+3% from last month',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'eco-purple'
    }
  ];

  // Chart data
  const barChartData = [
    { name: 'Gold', value: 234, percentage: '19%' },
    { name: 'Silver', value: 189, percentage: '15%' },
    { name: 'Copper', value: 456, percentage: '37%' },
    { name: 'Aluminum', value: 234, percentage: '19%' },
    { name: 'Plastic', value: 121, percentage: '10%' }
  ];

  const lineChartData = [
    { name: 'Jan', value: 180 },
    { name: 'Feb', value: 220 },
    { name: 'Mar', value: 210 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 260 },
    { name: 'Jun', value: 320 }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Materials Recovered</h1>
      <p className="page-subtitle">Track extracted materials and recovery metrics</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <CustomBarChart
          data={barChartData}
          title="Materials by Type (kg)"
          dataKey="value"
          fillColor="#22c55e"
        />
        <CustomLineChart
          data={lineChartData}
          title="Monthly Recovery Trend (kg)"
          dataKey="value"
          strokeColor="#3b82f6"
        />
      </div>

      {/* Material Breakdown */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 className="card-title">Material Breakdown Details</h3>
        <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
          {barChartData.map((material, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{material.name}</h4>
                <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
                  {material.value} kg recovered ({material.percentage} of total)
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0', fontWeight: '600', color: '#22c55e' }}>
                  ${(material.value * 45).toFixed(0)}
                </p>
                <p style={{ margin: '0', color: '#64748b', fontSize: '12px' }}>
                  Est. value
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 className="card-title">Quality Metrics</h3>
        <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Purity Rate</span>
              <span style={{ color: '#64748b' }}>94%</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '94%',
                height: '100%',
                backgroundColor: '#22c55e',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Processing Efficiency</span>
              <span style={{ color: '#64748b' }}>87%</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '87%',
                height: '100%',
                backgroundColor: '#3b82f6',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '500' }}>Environmental Compliance</span>
              <span style={{ color: '#64748b' }}>98%</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#e2e8f0', 
              borderRadius: '4px',
              position: 'relative'
            }}>
              <div style={{
                width: '98%',
                height: '100%',
                backgroundColor: '#10b981',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsRecovered;
