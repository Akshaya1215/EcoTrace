import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getTransactions } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const CorporateTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // For transactions corporate acts as a seller
      const data = await getTransactions('seller', currentUser.id);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transaction history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getRecyclerName = (recyclerId) => {
    const recyclers = {
      recycler_demo_001: "GreenCycle Pvt Ltd",
      recycler_demo_002: "EcoMetal Recyclers",
      recycler_demo_003: "Urban Scrap Solutions"
    };
    return recyclers[recyclerId] || recyclerId || "Demo Recycler";
  };

  // Calculations
  const completedTxns = transactions.filter(t => t.status === 'COMPLETED');
  const totalRevenue = completedTxns.reduce((sum, t) => sum + t.amount, 0);
  const avgTxn = transactions.length > 0 ? totalRevenue / transactions.length : 0;
  const pendingPayments = transactions.filter(t => t.status === 'PENDING' || t.status === 'PROCESSING').reduce((sum, t) => sum + t.amount, 0);
  const completedCount = completedTxns.length;

  const summaryData = [
    {
      title: 'Total Revenue',
      value: `₹ ${totalRevenue.toLocaleString()}`,
      change: 'Settled amount',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-green'
    },
    {
      title: 'Avg. Transaction',
      value: `₹ ${Math.round(avgTxn).toLocaleString()}`,
      change: 'Per-lot average',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Payments',
      value: `₹ ${pendingPayments.toLocaleString()}`,
      change: 'Settlement queue',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed Lots',
      value: completedCount.toString(),
      change: 'Fully processed',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Table data
  const tableData = transactions.map(item => ({
    id: item.id,
    device: item.deviceName,
    recycler: getRecyclerName(item.recyclerId),
    amount: `₹ ${item.amount.toLocaleString()}`,
    status: item.status,
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
  }));

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";
      case "PROCESSING":
      case "PENDING":
        return "processing";
      case "FAILED":
      case "CANCELLED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const tableColumns = [
    { key: 'id', title: 'Txn ID' },
    { key: 'device', title: 'Device Model' },
    { key: 'recycler', title: 'Recycler' },
    { key: 'amount', title: 'Amount' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      )
    },
    { key: 'date', title: 'Transaction Date' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Transactions</h1>
      <p className="page-subtitle">View your organization's transaction history</p>
      
      {error && (
        <div className="card" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ❌ {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading transaction history...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No transaction history found.</p>
        </div>
      ) : (
        /* Transactions Table */
        <DataTable
          title="Transaction History"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default CorporateTransactions;
