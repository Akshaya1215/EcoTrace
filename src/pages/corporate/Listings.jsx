import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DocumentTextIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getSellerListings, cancelListing } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const CorporateListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSellerListings(currentUser.id);
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load corporate listings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCancel = async (listingId) => {
    if (!window.confirm("Are you sure you want to cancel this listing?")) return;
    try {
      await cancelListing(listingId);
      alert("Listing cancelled successfully!");
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel listing");
    }
  };

  // Dynamic calculations
  const totalListings = listings.length;
  const activeCount = listings.filter(item => ['AVAILABLE', 'ACCEPTED', 'PICKUP_SCHEDULED', 'COLLECTED', 'PROCESSING'].includes(item.status)).length;
  const pendingReview = listings.filter(item => item.status === 'AVAILABLE').length; // available to marketplace
  const completedCount = listings.filter(item => item.status === 'COMPLETED').length;

  const summaryData = [
    {
      title: 'Total Listings',
      value: totalListings.toString(),
      change: 'Lifetime uploads',
      changeType: 'positive',
      icon: DocumentTextIcon,
      color: 'eco-green'
    },
    {
      title: 'Active in Logistics',
      value: activeCount.toString(),
      change: 'Ongoing pickups',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'Available listings',
      value: pendingReview.toString(),
      change: 'Open in marketplace',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed',
      value: completedCount.toString(),
      change: 'Processed completely',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Map to table rows
  const tableData = listings.map(item => ({
    id: item.id,
    device: item.deviceName,
    department: item.ewasteDescription?.includes('Department:') 
      ? item.ewasteDescription.split('Department:')[1].split('\n')[0].trim() 
      : 'Operations',
    weight: `${item.estimatedWeight}g`,
    value: `₹ ${(item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0).toLocaleString()}`,
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
    { key: 'department', title: 'Department' },
    { key: 'weight', title: 'Estimated Weight' },
    { key: 'value', title: 'Estimated Value' },
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
          {row.status === 'AVAILABLE' ? (
            <button
              onClick={() => handleCancel(row.id)}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '11px', color: 'red', borderColor: 'red' }}
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
      <h1 className="page-title">My Listings</h1>
      <p className="page-subtitle">Manage your organization's device listings</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No e-waste listings submitted yet.</p>
        </div>
      ) : (
        /* Listings Table */
        <DataTable
          title="Device Listings"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default CorporateListings;
