import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { TruckIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { getRecyclers, verifyRecycler } from '../../services/api';

const Recyclers = () => {
  const [recyclers, setRecyclers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecyclers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecyclers();
      setRecyclers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recyclers application queue");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecyclers();
  }, []);

  const handleVerify = async (recyclerId, newStatus) => {
    if (!window.confirm(`Are you sure you want to change status to ${newStatus}?`)) return;
    try {
      await verifyRecycler(recyclerId, newStatus);
      alert(`Recycler status updated to ${newStatus}!`);
      fetchRecyclers();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status");
    }
  };

  // Calculations for summary metrics
  const totalRecyclers = recyclers.length;
  const approvedCount = recyclers.filter(r => r.status === 'VERIFIED').length;
  const pendingCount = recyclers.filter(r => r.status === 'PENDING').length;
  const totalRevenue = recyclers.reduce((sum, r) => sum + (r.revenue || 0), 0);

  const summaryData = [
    {
      title: 'Total Recyclers',
      value: totalRecyclers.toString(),
      change: 'Registered accounts',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-green'
    },
    {
      title: 'Approved / Verified',
      value: approvedCount.toString(),
      change: 'Active processing centers',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Approval',
      value: pendingCount.toString(),
      change: 'Applications in review',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Processed Value (INR)',
      value: `₹ ${totalRevenue.toLocaleString()}`,
      change: 'Refined commodity value',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
      color: 'eco-purple'
    }
  ];

  // Map to table data
  const tableData = recyclers.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    location: item.location || 'N/A',
    status: item.status,
    devices: item.devices || 0,
    revenue: `₹ ${(item.revenue || 0).toLocaleString()}`,
    joined: item.joined ? new Date(item.joined).toLocaleDateString() : 'N/A',
    originalItem: item
  }));

  const getStatusClass = (status) => {
    switch (status) {
      case "VERIFIED":
        return "completed";
      case "PENDING":
        return "pending";
      case "REJECTED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const tableColumns = [
    { key: 'name', title: 'Company Name' },
    { key: 'email', title: 'Email' },
    { key: 'location', title: 'Location' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      )
    },
    { key: 'devices', title: 'Devices Processed' },
    { key: 'revenue', title: 'Turnaround Value' },
    { key: 'joined', title: 'Joined Date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {row.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleVerify(row.id, 'VERIFIED')}
                className="btn btn-primary"
                style={{ padding: '4px 10px', fontSize: '11px', backgroundColor: '#16a34a' }}
              >
                Approve
              </button>
              <button
                onClick={() => handleVerify(row.id, 'REJECTED')}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '11px', color: '#b91c1c', borderColor: '#fee2e2' }}
              >
                Reject
              </button>
            </>
          )}
          {row.status === 'VERIFIED' && (
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>Active Facility</span>
          )}
          {row.status === 'REJECTED' && (
            <span style={{ fontSize: '12px', color: '#b91c1c', fontWeight: '500' }}>Rejected</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Recycler Approvals</h1>
      <p className="page-subtitle">Manage recycler applications and approvals</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading recycler database...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No recycler applications found.</p>
        </div>
      ) : (
        /* Recyclers Table */
        <DataTable
          title="Recycler Applications"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Recyclers;
