import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { CheckCircleIcon, TruckIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { getAcceptedListings, schedulePickup, updateListingStatus } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const AcceptedDevices = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Scheduling state
  const [schedulingListing, setSchedulingListing] = useState(null);
  const [pickupForm, setPickupForm] = useState({
    pickupAddress: '',
    pickupDate: '',
    pickupTime: ''
  });
  
  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAcceptedListings(currentUser.id);
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load accepted devices. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleStatusChange = async (listingId, newStatus) => {
    try {
      await updateListingStatus(listingId, newStatus);
      alert(`Status updated to ${newStatus.replace('_', ' ')}!`);
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update status");
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!schedulingListing) return;
    
    try {
      await schedulePickup({
        listingId: schedulingListing.id,
        sellerId: schedulingListing.sellerId,
        recyclerId: currentUser.id,
        pickupAddress: pickupForm.pickupAddress,
        pickupDate: pickupForm.pickupDate,
        pickupTime: pickupForm.pickupTime
      });
      alert("Pickup scheduled successfully!");
      setSchedulingListing(null);
      setPickupForm({ pickupAddress: '', pickupDate: '', pickupTime: '' });
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to schedule pickup");
    }
  };

  // Status counts for summary cards
  const countByStatus = (statusList) => {
    return listings.filter(item => statusList.includes(item.status)).length;
  };

  const summaryData = [
    {
      title: 'Accepted Devices',
      value: countByStatus(['ACCEPTED', 'PICKUP_SCHEDULED', 'COLLECTED', 'PROCESSING', 'MATERIAL_RECOVERED', 'PAYMENT_PENDING', 'COMPLETED']).toString(),
      change: 'Active inventory',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-green'
    },
    {
      title: 'In Collection/Transit',
      value: countByStatus(['PICKUP_SCHEDULED', 'COLLECTED']).toString(),
      change: 'Scheduled collections',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-blue'
    },
    {
      title: 'In Processing',
      value: countByStatus(['PROCESSING', 'MATERIAL_RECOVERED']).toString(),
      change: 'Extraction queue',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Recycled Completed',
      value: countByStatus(['COMPLETED']).toString(),
      change: 'Lifetime totals',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-emerald'
    }
  ];

  // Map database listings to table data
  const tableData = listings.map(item => ({
    id: item.id,
    sellerId: item.sellerId,
    device: item.deviceName,
    seller: item.sellerName || 'Individual',
    weight: `${item.estimatedWeight}g`,
    value: `₹ ${item.estimatedRecoveryValue?.estimatedValue || 0}`,
    status: item.status,
    accepted: item.acceptedAt ? new Date(item.acceptedAt).toLocaleDateString() : 'N/A',
    pickupInfo: item.pickupDetails ? `${item.pickupDetails.pickupDate} @ ${item.pickupDetails.pickupTime}` : 'Not Scheduled'
  }));

  const getStatusClass = (status) => {
    const statusMap = {
      ACCEPTED: "pending",
      PICKUP_SCHEDULED: "processing",
      COLLECTED: "processing",
      PROCESSING: "processing",
      MATERIAL_RECOVERED: "processing",
      PAYMENT_PENDING: "pending",
      COMPLETED: "completed",
      CANCELLED: "cancelled"
    };
    return statusMap[status] || "pending";
  };

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'seller', title: 'Seller' },
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
    { key: 'accepted', title: 'Accepted Date' },
    { key: 'pickupInfo', title: 'Pickup Schedule' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {row.status === 'ACCEPTED' && (
            <button
              onClick={() => {
                setSchedulingListing(row);
                setPickupForm({
                  pickupAddress: row.location || '',
                  pickupDate: '',
                  pickupTime: ''
                });
              }}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              Schedule Pickup
            </button>
          )}
          {row.status === 'PICKUP_SCHEDULED' && (
            <button
              onClick={() => handleStatusChange(row.id, 'COLLECTED')}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              Mark Collected
            </button>
          )}
          {row.status === 'COLLECTED' && (
            <button
              onClick={() => handleStatusChange(row.id, 'PROCESSING')}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: 'var(--color-green)', color: '#fff' }}
            >
              Start Processing
            </button>
          )}
          {['PROCESSING', 'MATERIAL_RECOVERED', 'PAYMENT_PENDING', 'COMPLETED'].includes(row.status) && (
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Sent to Processing
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Accepted Devices</h1>
      <p className="page-subtitle">Track and manage collection logistics for accepted devices</p>
      
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

      {/* Scheduling Form Modal/Card */}
      {schedulingListing && (
        <div className="card animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto 30px', border: '2px solid var(--accent-primary)' }}>
          <h3 className="card-title">Schedule Pickup: {schedulingListing.device}</h3>
          <form onSubmit={handleScheduleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label className="form-label">Pickup Address</label>
              <textarea
                value={pickupForm.pickupAddress}
                onChange={(e) => setPickupForm({ ...pickupForm, pickupAddress: e.target.value })}
                className="form-input"
                rows={2}
                required
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={pickupForm.pickupDate}
                  onChange={(e) => setPickupForm({ ...pickupForm, pickupDate: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Time</label>
                <input
                  type="time"
                  value={pickupForm.pickupTime}
                  onChange={(e) => setPickupForm({ ...pickupForm, pickupTime: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setSchedulingListing(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Confirm Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading accepted devices...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No accepted devices in queue.</p>
        </div>
      ) : (
        /* Accepted Devices Table */
        <DataTable
          title="Accepted Device Inventory"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default AcceptedDevices;
