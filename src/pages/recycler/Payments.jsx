import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CurrencyDollarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getTransactions, completeTransaction } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions('recycler', currentUser.id);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions queue.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleComplete = async (txnId) => {
    if (!window.confirm("Complete this payment transaction (Demo)?")) return;
    try {
      await completeTransaction(txnId);
      alert("Payment processed successfully!");
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to complete payment");
    }
  };

  // Dynamic calculations
  const pendingAmount = transactions.filter(t => t.status === 'PENDING').reduce((sum, t) => sum + t.amount, 0);
  const processingAmount = transactions.filter(t => t.status === 'PROCESSING').reduce((sum, t) => sum + t.amount, 0);
  const paidAmount = transactions.filter(t => t.status === 'COMPLETED').reduce((sum, t) => sum + t.amount, 0);
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  const summaryData = [
    {
      title: 'Payments Pending',
      value: `₹ ${pendingAmount.toLocaleString()}`,
      change: 'Awaiting transfer',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-blue'
    },
    {
      title: 'Processing',
      value: `₹ ${processingAmount.toLocaleString()}`,
      change: 'In transit',
      changeType: 'neutral',
      icon: ExclamationTriangleIcon,
      color: 'eco-orange'
    },
    {
      title: 'Paid (Demo)',
      value: `₹ ${paidAmount.toLocaleString()}`,
      change: 'Settled lot yields',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-green'
    },
    {
      title: 'Total Turnaround',
      value: `₹ ${totalAmount.toLocaleString()}`,
      change: 'Combined lot value',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-emerald'
    }
  ];

  // Map to table data
  const tableData = transactions.map(item => ({
    id: item.id,
    device: item.deviceName,
    seller: item.sellerId === 'seller_demo_001' ? 'Demo Seller' : item.sellerId,
    amount: `₹ ${item.amount.toLocaleString()}`,
    status: item.status,
    dueDate: item.createdAt ? new Date(new Date(item.createdAt).getTime() + 5*24*60*60*1000).toLocaleDateString() : 'N/A', // due in 5 days
    acceptedDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    originalItem: item
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
    { key: 'dueDate', title: 'Due Date' },
    { key: 'acceptedDate', title: 'Created Date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div>
          {row.originalItem.status === 'PENDING' && (
            <button
              onClick={() => handleComplete(row.id)}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#16a34a', color: '#fff' }}
            >
              Pay Now (Demo)
            </button>
          )}
          {row.originalItem.status === 'COMPLETED' && (
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Paid
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Payments</h1>
      <p className="page-subtitle">Manage payments to sellers and financial transactions</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading payment entries...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No pending or processed payments found.</p>
        </div>
      ) : (
        /* Payments Table */
        <DataTable
          title="Payment Schedule"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Payments;
