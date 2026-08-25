import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { TruckIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getSellerListings, schedulePickup } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const PickupSchedule = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    listingId: '',
    department: 'sustainability',
    contactPerson: '',
    contactEmail: '',
    pickupDate: '',
    pickupTime: '',
    pickupAddress: ''
  });

  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSellerListings(currentUser.id);
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings for pickup schedule");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.listingId) {
      alert("Please select a device/lot to schedule pickup for.");
      return;
    }

    try {
      const selectedListing = listings.find(l => l.id === formData.listingId);
      // Recycler is mock-assigned or we use a fallback if not accepted yet
      const recyclerId = selectedListing?.recyclerId || "recycler_demo_001";
      
      await schedulePickup({
        listingId: formData.listingId,
        sellerId: currentUser.id,
        recyclerId: recyclerId,
        pickupAddress: formData.pickupAddress || selectedListing?.location || 'Organization Headquarters',
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime
      });

      alert('Pickup scheduled successfully!');
      setFormData({
        listingId: '',
        department: 'sustainability',
        contactPerson: '',
        contactEmail: '',
        pickupDate: '',
        pickupTime: '',
        pickupAddress: ''
      });
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to schedule pickup');
    }
  };

  // Filter listings that are accepted by recycler but not scheduled, to display in the dropdown
  const schedulableListings = listings.filter(l => l.status === 'ACCEPTED');

  // Filter listings that have pickup details scheduled
  const scheduledListings = listings.filter(l => l.pickupDetails || ['PICKUP_SCHEDULED', 'COLLECTED', 'PROCESSING', 'COMPLETED'].includes(l.status));

  // Summary counts
  const totalScheduled = scheduledListings.length;
  const todayCount = scheduledListings.filter(l => {
    if (!l.pickupDetails?.pickupDate) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return l.pickupDetails.pickupDate === todayStr;
  }).length;
  const pendingCount = listings.filter(l => l.status === 'ACCEPTED').length;
  const completedCount = listings.filter(l => l.status === 'COMPLETED').length;

  const summaryData = [
    {
      title: 'Scheduled Pickups',
      value: totalScheduled.toString(),
      change: 'Active lots',
      changeType: 'positive',
      icon: CalendarIcon,
      color: 'eco-green'
    },
    {
      title: "Today's Pickups",
      value: todayCount.toString(),
      change: 'Scheduled for today',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-blue'
    },
    {
      title: 'Awaiting Schedule',
      value: pendingCount.toString(),
      change: 'Accepted by recyclers',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed Pickups',
      value: completedCount.toString(),
      change: 'Refined & Completed',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Table Data mapping
  const tableData = scheduledListings.map(item => {
    // Determine department from description if available
    let dept = 'Sustainability';
    if (item.ewasteDescription?.includes('Department:')) {
      dept = item.ewasteDescription.split('Department:')[1].split('\n')[0].trim();
    }
    return {
      id: item.id,
      device: item.deviceName,
      department: dept,
      contact: item.contactDetails || 'N/A',
      date: item.pickupDetails?.pickupDate || 'N/A',
      time: item.pickupDetails?.pickupTime || 'N/A',
      deviceCount: '1 Lot',
      status: item.status
    };
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";
      case "PICKUP_SCHEDULED":
        return "processing";
      case "COLLECTED":
      case "PROCESSING":
        return "processing";
      default:
        return "pending";
    }
  };

  const tableColumns = [
    { key: 'device', title: 'Device/Lot' },
    { key: 'department', title: 'Department' },
    { key: 'contact', title: 'Contact Person' },
    { key: 'date', title: 'Date' },
    { key: 'time', title: 'Time' },
    { key: 'deviceCount', title: 'Volume' },
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
      <h1 className="page-title">Pickup Schedule</h1>
      <p className="page-subtitle">Manage device pickup schedules and logistics</p>
      
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

      {/* Schedule New Pickup Form */}
      {schedulableListings.length > 0 && (
        <div className="card" style={{ marginBottom: '32px' }}>
          <h3 className="card-title">Schedule Pickup for Accepted Lots</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <label className="form-label">Select Device/Lot *</label>
                <select
                  name="listingId"
                  value={formData.listingId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select accepted device...</option>
                  {schedulableListings.map(l => (
                    <option key={l.id} value={l.id}>{l.deviceName} ({l.brand})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. John Smith"
                  required
                />
              </div>

              <div>
                <label className="form-label">Contact Email *</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john.smith@company.com"
                  required
                />
              </div>

              <div>
                <label className="form-label">Pickup Address *</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Office address for pickup"
                  required
                />
              </div>

              <div>
                <label className="form-label">Pickup Date *</label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  name="pickupDate"
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Pickup Time *</label>
                <select
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select time...</option>
                  <option value="09:00 AM">9:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="01:00 PM">1:00 PM</option>
                  <option value="03:30 PM">3:30 PM</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button type="submit" className="btn btn-primary">
                Schedule Pickup
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading pickup schedules...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No pickup schedules logged. Recyclers schedule pickups once they accept your listings.</p>
        </div>
      ) : (
        /* Pickup Schedule Table */
        <DataTable
          title="Pickup Logistics Schedule"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default PickupSchedule;
