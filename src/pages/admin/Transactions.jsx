import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getTransactions } from '../../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions('admin');
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load platform transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculations for summary metrics
  const completedTxns = transactions.filter(t => t.status === 'COMPLETED');
  const totalRevenue = completedTxns.reduce((sum, t) => sum + t.amount, 0);
  const avgTxn = transactions.length > 0 ? totalRevenue / transactions.length : 0;
  const pendingPayments = transactions.filter(t => t.status === 'PENDING' || t.status === 'PROCESSING').reduce((sum, t) => sum + t.amount, 0);
  const completedCount = completedTxns.length;

  const summaryData = [
    {
      title: 'Platform Turnover',
      value: `₹ ${totalRevenue.toLocaleString()}`,
      change: 'Settled payments',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-green'
    },
    {
      title: 'Avg. Transaction',
      value: `₹ ${Math.round(avgTxn).toLocaleString()}`,
      change: 'Per lot value',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Settlements',
      value: `₹ ${pendingPayments.toLocaleString()}`,
      change: 'Awaiting refinement completion',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Settled Lots',
      value: completedCount.toString(),
      change: 'Refined commodity lots',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  const getRecyclerName = (recyclerId) => {
    const recyclers = {
      recycler_demo_001: "GreenCycle Pvt Ltd",
      recycler_demo_002: "EcoMetal Recyclers",
      recycler_demo_003: "Urban Scrap Solutions"
    };
    return recyclers[recyclerId] || recyclerId || "Demo Recycler";
  };

  // Map to table data
  const tableData = transactions.map(item => ({
    id: item.id,
    device: item.deviceName,
    buyer: getRecyclerName(item.recyclerId),
    seller: item.sellerId === 'seller_demo_001' ? 'Demo Seller' : item.sellerId,
    amount: `₹ ${item.amount.toLocaleString()}`,
    status: item.status,
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    method: 'Escrow INR'
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
    { key: 'buyer', title: 'Recycler (Buyer)' },
    { key: 'seller', title: 'Seller' },
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
    { key: 'date', title: 'Date' },
    { key: 'method', title: 'Payment Method' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">All Transactions</h1>
      <p className="page-subtitle">Monitor platform transactions and revenue</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading transactions...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No transaction logs recorded.</p>
        </div>
      ) : (
        /* Transactions Table */
        <DataTable
          title="Platform Transactions"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Transactions;
