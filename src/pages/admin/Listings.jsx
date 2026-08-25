import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DocumentTextIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getListings, cancelListing } from '../../services/api';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getListings();
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load platform listings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCancel = async (listingId) => {
    if (!window.confirm("Are you sure you want to cancel this listing (Admin override)?")) return;
    try {
      await cancelListing(listingId);
      alert("Listing cancelled successfully.");
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel listing");
    }
  };

  // Calculations for summary metrics
  const totalCount = listings.length;
  const activeCount = listings.filter(l => ['AVAILABLE', 'ACCEPTED', 'PICKUP_SCHEDULED', 'COLLECTED', 'PROCESSING'].includes(l.status)).length;
  const pendingCount = listings.filter(l => l.status === 'AVAILABLE').length;
  const completedCount = listings.filter(l => l.status === 'COMPLETED').length;

  const summaryData = [
    {
      title: 'Total Listings',
      value: totalCount.toString(),
      change: 'Lifetime listings',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-green'
    },
    {
      title: 'Active in Logistics',
      value: activeCount.toString(),
      change: 'Ongoing collections/processing',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Marketplace Available',
      value: pendingCount.toString(),
      change: 'Open for bidding/collection',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Recycling Completed',
      value: completedCount.toString(),
      change: 'Fully processed raw yields',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Map to table data
  const tableData = listings.map(item => ({
    id: item.id,
    device: item.deviceName,
    seller: item.sellerName || 'Demo Seller',
    type: item.sellerId?.includes('corporate') ? 'Corporate' : 'Individual',
    price: `₹ ${(item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0).toLocaleString()}`,
    status: item.status,
    listed: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'
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
    { key: 'device', title: 'Device Model' },
    { key: 'seller', title: 'Seller' },
    { key: 'type', title: 'Seller Type' },
    { key: 'price', title: 'Est./Final Value' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status.replace(/_/g, ' ')}
        </span>
      )
    },
    { key: 'listed', title: 'Listed Date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div>
          {['AVAILABLE', 'DRAFT', 'AI_ANALYZED'].includes(row.status) ? (
            <button
              onClick={() => handleCancel(row.id)}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '11px', color: '#b91c1c', borderColor: '#fee2e2' }}
            >
              Cancel
            </button>
          ) : (
            <span style={{ fontSize: '12px', color: '#64748b' }}>Locked</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">All Listings</h1>
      <p className="page-subtitle">Monitor and manage platform listings</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading listings...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No marketplace listings found.</p>
        </div>
      ) : (
        /* Listings Table */
        <DataTable
          title="Platform Listings"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Listings;
