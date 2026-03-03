import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { UserGroupIcon, UserPlusIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Users = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Total Users',
      value: '8,547',
      change: '+23% from last month',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'eco-green'
    },
    {
      title: 'New This Month',
      value: '342',
      change: '+12% from last month',
      changeType: 'positive',
      icon: UserPlusIcon,
      color: 'eco-blue'
    },
    {
      title: 'Active Users',
      value: '6,234',
      change: '+8% from last month',
      changeType: 'positive',
      icon: UserIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Verified Users',
      value: '5,847',
      change: '+15% from last month',
      changeType: 'positive',
      icon: ShieldCheckIcon,
      color: 'eco-purple'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      type: 'Individual',
      status: 'active',
      joined: '2024-01-15',
      devices: '12',
      revenue: '$450'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      type: 'Corporate',
      status: 'active',
      joined: '2024-01-10',
      devices: '45',
      revenue: '$2,800'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@greenrecycle.com',
      type: 'Recycler',
      status: 'pending',
      joined: '2024-01-08',
      devices: '78',
      revenue: '$5,200'
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      type: 'Individual',
      status: 'active',
      joined: '2024-01-05',
      devices: '8',
      revenue: '$320'
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert.b@ecofirm.com',
      type: 'Corporate',
      status: 'suspended',
      joined: '2024-01-03',
      devices: '23',
      revenue: '$1,450'
    }
  ];

  const tableColumns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'type', title: 'User Type' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { key: 'joined', title: 'Joined Date' },
    { key: 'devices', title: 'Devices' },
    { key: 'revenue', title: 'Revenue' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Manage Users</h1>
      <p className="page-subtitle">View and manage all platform users</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Users Table */}
      <DataTable
        title="All Users"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Users;
