import React, { useState, useEffect } from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import DataTable from '../../components/ui/DataTable';
import { 
  DevicePhoneMobileIcon, 
  CurrencyDollarIcon, 
  TruckIcon
} from '@heroicons/react/24/outline';
import { getSellerListings } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const CorporateDashboard = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSellerListings(currentUser.id);
        setListings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load corporate dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Dynamic calculations
  const totalDevices = listings.length;
  const totalValue = listings.reduce((sum, item) => sum + (item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0), 0);
  const activePickups = listings.filter(item => ['PICKUP_SCHEDULED', 'COLLECTED', 'PROCESSING'].includes(item.status)).length;

  const summaryData = [
    {
      title: 'Total Devices Submitted',
      value: totalDevices.toString(),
      change: 'Lifetime uploads',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Est. Value',
      value: `₹ ${totalValue.toLocaleString()}`,
      change: 'Settled + Available',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-blue'
    },
    {
      title: 'Active Logistics',
      value: activePickups.toString(),
      change: 'In-transit lots',
      changeType: 'neutral',
      icon: TruckIcon,
      color: 'eco-orange'
    }
  ];

  // Map categories for Bar Chart
  const categoryCounts = {};
  listings.forEach(item => {
    const cat = item.category || 'generic';
    const cleanCat = cat.charAt(0).toUpperCase() + cat.slice(1) + 's';
    categoryCounts[cleanCat] = (categoryCounts[cleanCat] || 0) + 1;
  });

  const barChartData = Object.keys(categoryCounts).map(name => ({
    name,
    value: categoryCounts[name]
  }));

  // Seed chart data if empty
  const activeBarData = barChartData.length > 0 ? barChartData : [
    { name: 'Laptops', value: 12 },
    { name: 'Smartphones', value: 8 },
    { name: 'Tablets', value: 5 },
    { name: 'Generics', value: 2 }
  ];

  const lineChartData = [
    { name: 'Jan', value: 1800 },
    { name: 'Feb', value: 2200 },
    { name: 'Mar', value: 2100 },
    { name: 'Apr', value: totalValue > 0 ? Math.round(totalValue * 0.4) : 2800 },
    { name: 'May', value: totalValue > 0 ? Math.round(totalValue * 0.7) : 2600 },
    { name: 'Jun', value: totalValue > 0 ? Math.round(totalValue) : 3200 }
  ];

  const tableData = listings.slice(0, 5).map(item => ({
    id: item.id,
    device: item.deviceName,
    department: item.ewasteDescription?.includes('Department:') 
      ? item.ewasteDescription.split('Department:')[1].split('\n')[0].trim() 
      : 'Operations',
    submitted: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    status: item.status,
    value: `₹ ${item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0}`
  }));

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";
      case "AVAILABLE":
        return "pending";
      case "CANCELLED":
        return "cancelled";
      default:
        return "processing";
    }
  };

  const tableColumns = [
    { key: 'device', title: 'Device' },
    { key: 'department', title: 'Department' },
    { key: 'submitted', title: 'Submitted Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status.replace(/_/g, ' ')}
        </span>
      )
    },
    { key: 'value', title: 'Est. Value' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Corporate Dashboard</h1>
      <p className="page-subtitle">Manage your organization's e-waste recycling program</p>
      
      {error && (
        <div className="card" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ❌ {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading corporate dashboard...</p>
        </div>
      ) : (
        <>
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
              title="Recycling Value Trend (INR)"
              dataKey="value"
              strokeColor="#22c55e"
            />
            <CustomBarChart
              data={activeBarData}
              title="Device Types Submitted"
              dataKey="value"
              fillColor="#3b82f6"
            />
          </div>

          {/* Recent Submissions Table */}
          {tableData.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '30px' }}>
              <p style={{ color: '#64748b' }}>No device submissions yet. Head to **Bulk Upload** to submit inventory.</p>
            </div>
          ) : (
            <DataTable
              title="Recent Device Submissions"
              data={tableData}
              columns={tableColumns}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CorporateDashboard;
