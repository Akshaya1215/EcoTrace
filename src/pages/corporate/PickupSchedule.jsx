import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { TruckIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const PickupSchedule = () => {
  const [formData, setFormData] = useState({
    department: '',
    contactPerson: '',
    contactEmail: '',
    pickupDate: '',
    pickupTime: '',
    deviceCount: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pickup scheduled successfully!');
  };

  // Summary data
  const summaryData = [
    {
      title: 'Scheduled Pickups',
      value: '12',
      change: '+3 this week',
      changeType: 'positive',
      icon: CalendarIcon,
      color: 'eco-green'
    },
    {
      title: 'Today\'s Pickups',
      value: '3',
      change: '2 completed',
      changeType: 'positive',
      icon: TruckIcon,
      color: 'eco-blue'
    },
    {
      title: 'Pending Approval',
      value: '5',
      change: '+2 from yesterday',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-orange'
    },
    {
      title: 'Completed This Month',
      value: '28',
      change: '+8% from last month',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      department: 'Engineering',
      contact: 'John Smith',
      date: '2024-01-15',
      time: '10:00 AM',
      deviceCount: '15',
      status: 'scheduled'
    },
    {
      id: '2',
      department: 'Sales',
      contact: 'Sarah Johnson',
      date: '2024-01-15',
      time: '2:00 PM',
      deviceCount: '8',
      status: 'in_progress'
    },
    {
      id: '3',
      department: 'Marketing',
      contact: 'Mike Davis',
      date: '2024-01-16',
      time: '11:00 AM',
      deviceCount: '12',
      status: 'pending'
    },
    {
      id: '4',
      department: 'HR',
      contact: 'Emily Wilson',
      date: '2024-01-16',
      time: '3:00 PM',
      deviceCount: '6',
      status: 'scheduled'
    },
    {
      id: '5',
      department: 'Finance',
      contact: 'Robert Brown',
      date: '2024-01-17',
      time: '9:00 AM',
      deviceCount: '10',
      status: 'pending'
    }
  ];

  const tableColumns = [
    { key: 'department', title: 'Department' },
    { key: 'contact', title: 'Contact Person' },
    { key: 'date', title: 'Date' },
    { key: 'time', title: 'Time' },
    { key: 'deviceCount', title: 'Device Count' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.replace('_', '').toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
        </span>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Pickup Schedule</h1>
      <p className="page-subtitle">Manage device pickup schedules and logistics</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Schedule New Pickup */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 className="card-title">Schedule New Pickup</h3>
        <form onSubmit={handleSubmit} style={{ marginTop: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label className="form-label">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
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
                placeholder="John Smith"
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
              <label className="form-label">Device Count *</label>
              <input
                type="number"
                name="deviceCount"
                value={formData.deviceCount}
                onChange={handleChange}
                className="form-input"
                placeholder="10"
                min="1"
                required
              />
            </div>

            <div>
              <label className="form-label">Pickup Date *</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
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
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label className="form-label">Special Instructions</label>
            <textarea
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              className="form-input"
              rows={3}
              placeholder="Any special requirements or instructions..."
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn btn-primary">
              Schedule Pickup
            </button>
          </div>
        </form>
      </div>

      {/* Pickup Schedule Table */}
      <DataTable
        title="Pickup Schedule"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default PickupSchedule;
