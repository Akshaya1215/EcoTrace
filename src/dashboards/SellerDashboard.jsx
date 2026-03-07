import React from 'react';
import SummaryCard from '../components/SummaryCard';
import CustomLineChart from '../components/LineChart';
import DataTable from '../components/DataTable';
import {
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const SellerDashboard = () => {



  const lineChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 450 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 650 },
    { name: 'Jun', value: 900 }
  ];

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

      {/* 🌍 HERO MOTIVATION SECTION */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '40px',
          backgroundImage:
            "url('https://www.frost.com/growth-opportunity-news/top-5-growth-opportunities-in-the-global-e-waste-recycling-market/z')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0.4))',
            width: '100%',
            padding: '50px',
            color: 'white'
          }}
        >
          <h1 style={{ fontSize: '34px', fontWeight: 700 }}>
            Turn Your E-Waste into Income 💰
          </h1>
          <p style={{ fontSize: '18px', marginTop: '10px', maxWidth: '600px' }}>
            Every device you recycle reduces pollution, saves resources,
            and earns you money. Start selling smarter. Start selling sustainably.
          </p>
          <div style={{ marginTop: '20px' }}>
            <span
              style={{
                background: '#22c55e',
                padding: '10px 20px',
                borderRadius: '30px',
                fontWeight: 600
              }}
            >
              🌱 Make Impact. Earn More.
            </span>
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}


      {/* MOTIVATION STRIP */}


      {/* CHART */}
      <div className="charts-grid">
        <CustomLineChart
          data={lineChartData}
          title="Monthly Earnings Growth"
          dataKey="value"
          strokeColor="#22c55e"
        />
      </div>

      {/* TABLE */}
      <DataTable
        title="Recent Recycling Activity"
        data={tableData}
        columns={tableColumns}
      />

    </div>
  );
};

export default SellerDashboard;