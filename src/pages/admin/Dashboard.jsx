import React, { useState, useEffect } from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import DataTable from '../../components/ui/DataTable';
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  TruckIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { getAdminAnalytics, getListings } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentListings, setRecentListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdminData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const statsData = await getAdminAnalytics();
      setStats(statsData);
      
      const listingsData = await getListings();
      setRecentListings(listingsData.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Failed to load platform analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const summaryData = stats ? [
    {
      title: 'Total Users',
      value: stats.totalUsers?.toLocaleString() || '0',
      change: `${stats.sellerAccounts || 0} Sellers`,
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'eco-green'
    },
    {
      title: 'Corporate Accounts',
      value: stats.corporateAccounts?.toString() || '0',
      change: 'Active profiles',
      changeType: 'positive',
      icon: BuildingOfficeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Active Recyclers',
      value: stats.verifiedRecyclers?.toString() || '0',
      change: 'Verified facilities',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Total Turnaround Value',
      value: `₹ ${stats.totalRevenue?.toLocaleString() || '0'}`,
      change: `${stats.completedTransactions || 0} Settled Lots`,
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-purple'
    },
    {
      title: 'Total Listings',
      value: stats.totalListings?.toLocaleString() || '0',
      change: `${stats.activeListings || 0} Available`,
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-orange'
    }
  ] : [];

  // Chart data
  const lineChartData = [
    { name: 'Jan', value: 40000 },
    { name: 'Feb', value: 60000 },
    { name: 'Mar', value: 55000 },
    { name: 'Apr', value: 80000 },
    { name: 'May', value: stats?.totalRevenue ? Math.round(stats.totalRevenue * 0.8) : 72000 },
    { name: 'Jun', value: stats?.totalRevenue ? Math.round(stats.totalRevenue) : 95000 }
  ];

  const barChartData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 180 },
    { name: 'Mar', value: 160 },
    { name: 'Apr', value: 240 },
    { name: 'May', value: stats?.totalListings ? Math.round(stats.totalListings * 0.7) : 210 },
    { name: 'Jun', value: stats?.totalListings ? Math.round(stats.totalListings) : 280 }
  ];

  // Map listings to recent platform activity
  const tableData = recentListings.map(item => ({
    id: item.id,
    user: item.sellerName || 'Demo Seller',
    type: item.sellerId?.includes('corporate') ? 'Corporate' : 'Individual',
    devices: item.deviceName,
    revenue: `₹ ${(item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0).toLocaleString()}`,
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    status: item.status
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
    { key: 'user', title: 'Seller/Organization' },
    { key: 'type', title: 'Type' },
    { key: 'devices', title: 'Device Model' },
    { key: 'revenue', title: 'Est./Final Value' },
    { key: 'date', title: 'Date' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status.replace(/_/g, ' ')}
        </span>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-subtitle">Platform overview and management</p>
      
      {error && (
        <div className="card" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ❌ {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading platform analytics...</p>
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
              title="Platform Turnaround Trend (INR)"
              dataKey="value"
              strokeColor="#22c55e"
            />
            <CustomBarChart
              data={barChartData}
              title="Listing Registrations"
              dataKey="value"
              fillColor="#3b82f6"
            />
          </div>

          {/* Recent Activity Table */}
          {tableData.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '30px' }}>
              <p style={{ color: '#64748b' }}>No recent marketplace activities found.</p>
            </div>
          ) : (
            <DataTable
              title="Recent Platform Activity"
              data={tableData}
              columns={tableColumns}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
