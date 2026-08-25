import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { UserGroupIcon, UserPlusIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { getUsers } from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load user database");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Summary card counts
  const totalCount = users.length;
  const sellerCount = users.filter(u => u.role === 'seller').length;
  const corporateCount = users.filter(u => u.role === 'corporate').length;
  const recyclerCount = users.filter(u => u.role === 'recycler').length;

  const summaryData = [
    {
      title: 'Total Users',
      value: totalCount.toString(),
      change: 'Registered accounts',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'eco-green'
    },
    {
      title: 'Sellers Registered',
      value: sellerCount.toString(),
      change: 'Individual sellers',
      changeType: 'positive',
      icon: UserIcon,
      color: 'eco-blue'
    },
    {
      title: 'Corporate Accounts',
      value: corporateCount.toString(),
      change: 'Enterprise profiles',
      changeType: 'positive',
      icon: ShieldCheckIcon,
      color: 'eco-purple'
    },
    {
      title: 'Recycler Nodes',
      value: recyclerCount.toString(),
      change: 'Refinement facilities',
      changeType: 'positive',
      icon: UserPlusIcon,
      color: 'eco-emerald'
    }
  ];

  // Map to table data
  const tableData = users.map(item => ({
    id: item.id,
    name: item.name,
    email: item.email,
    type: item.role.charAt(0).toUpperCase() + item.role.slice(1),
    status: item.status || 'Active',
    joined: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
    devices: item.role === 'recycler' ? 'Refining center' : (item.role === 'corporate' ? 'ESG Account' : 'Seller Profile'),
    revenue: 'Platform Account'
  }));

  const getStatusClass = (status) => {
    const s = status.toLowerCase();
    if (s === 'active' || s === 'verified') return 'completed';
    if (s === 'pending') return 'pending';
    return 'cancelled';
  };

  const tableColumns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'type', title: 'User Type' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      )
    },
    { key: 'joined', title: 'Joined Date' },
    { key: 'devices', title: 'Scope' },
    { key: 'revenue', title: 'Account Type' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Manage Users</h1>
      <p className="page-subtitle">View and manage all platform users</p>
      
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading user base...</p>
        </div>
      ) : tableData.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No users registered in the database.</p>
        </div>
      ) : (
        /* Users Table */
        <DataTable
          title="All Platform Users"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Users;
