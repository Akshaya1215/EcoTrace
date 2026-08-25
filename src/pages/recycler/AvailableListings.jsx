import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { DevicePhoneMobileIcon, EyeIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getAvailableListings, acceptListing } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const AvailableListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAvailableListings();
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load available listings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleAccept = async (listingId) => {
    if (!window.confirm("Are you sure you want to accept this device for recycling?")) return;
    try {
      await acceptListing(listingId, currentUser.id);
      alert("Device accepted successfully! It will now appear in your Accepted Devices queue.");
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to accept device");
    }
  };

  // Dynamic calculations for summary cards
  const totalValue = listings.reduce((sum, item) => sum + (item.estimatedRecoveryValue?.estimatedValue || 0), 0);
  const highPriorityCount = listings.filter(item => {
    const cat = item.category || '';
    return cat === 'smartphone' || cat === 'laptop'; // mock priority rule: smartphones & laptops are high priority
  }).length;

  const summaryData = [
    {
      title: 'Available Devices',
      value: listings.length.toString(),
      change: 'Real-time',
      changeType: 'positive',
      icon: DevicePhoneMobileIcon,
      color: 'eco-green'
    },
    {
      title: 'New Today',
      value: listings.filter(item => {
        const todayStr = new Date().toDateString();
        const itemStr = item.createdAt ? new Date(item.createdAt).toDateString() : '';
        return todayStr === itemStr;
      }).length.toString(),
      change: 'Recent uploads',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'eco-blue'
    },
    {
      title: 'High Priority',
      value: highPriorityCount.toString(),
      change: 'Critical items',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Total Est. Value',
      value: `₹ ${totalValue.toLocaleString()}`,
      change: 'Scrap market index',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Map database listings to table data
  const tableData = listings.map(item => ({
    id: item.id,
    device: item.deviceName,
    seller: item.sellerName || 'Individual',
    weight: `${item.estimatedWeight}g`,
    price: `₹ ${item.estimatedRecoveryValue?.estimatedValue || 0}`,
    condition: item.condition,
    location: item.location,
    listed: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    priority: (item.category === 'smartphone' || item.category === 'laptop') ? 'high' : 'medium'
  }));

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'seller', title: 'Seller' },
    { key: 'weight', title: 'Estimated Weight' },
    { key: 'price', title: 'Est. Recovery Value' },
    { key: 'condition', title: 'Condition' },
    { key: 'location', title: 'Location' },
    { key: 'listed', title: 'Listed Date' },
    { 
      key: 'priority', 
      title: 'Priority',
      render: (priority) => (
        <span className={`status-badge ${priority}`}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleAccept(row.id)}
          className="btn btn-primary"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          Accept
        </button>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Available Listings</h1>
      <p className="page-subtitle">Browse and accept available device listings for recycling</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading available listings...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>There are no available listings in the marketplace at the moment.</p>
        </div>
      ) : (
        /* Available Listings Table */
        <DataTable
          title="Available Device Listings"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default AvailableListings;
