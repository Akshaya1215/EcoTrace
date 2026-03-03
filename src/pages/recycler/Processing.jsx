import React from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { ArrowPathIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Processing = () => {
  // Summary data
  const summaryData = [
    {
      title: 'Processing Queue',
      value: '45',
      change: '+5% from yesterday',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-blue'
    },
    {
      title: 'In Progress',
      value: '28',
      change: '+3 from yesterday',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-green'
    },
    {
      title: 'Completed Today',
      value: '12',
      change: '+4 from yesterday',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Delayed',
      value: '5',
      change: '-2 from yesterday',
      changeType: 'negative',
      icon: ExclamationTriangleIcon,
      color: 'eco-red'
    }
  ];

  // Table data
  const tableData = [
    {
      id: '1',
      device: 'iPhone 12 Pro',
      batch: 'BATCH-001',
      stage: 'disassembly',
      progress: '75%',
      started: '2024-01-15',
      estimatedCompletion: '2024-01-17',
      technician: 'John Smith'
    },
    {
      id: '2',
      device: 'MacBook Air 2020',
      batch: 'BATCH-002',
      stage: 'material_extraction',
      progress: '45%',
      started: '2024-01-14',
      estimatedCompletion: '2024-01-18',
      technician: 'Sarah Johnson'
    },
    {
      id: '3',
      device: 'iPad Pro 2021',
      batch: 'BATCH-001',
      stage: 'sorting',
      progress: '90%',
      started: '2024-01-13',
      estimatedCompletion: '2024-01-16',
      technician: 'Mike Davis'
    },
    {
      id: '4',
      device: 'Samsung Galaxy S21',
      batch: 'BATCH-003',
      stage: 'quality_check',
      progress: '95%',
      started: '2024-01-12',
      estimatedCompletion: '2024-01-15',
      technician: 'Emily Wilson'
    },
    {
      id: '5',
      device: 'Dell XPS 13',
      batch: 'BATCH-002',
      stage: 'disassembly',
      progress: '30%',
      started: '2024-01-11',
      estimatedCompletion: '2024-01-19',
      technician: 'Robert Brown'
    }
  ];

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'batch', title: 'Batch ID' },
    { key: 'stage', title: 'Processing Stage' },
    { key: 'progress', title: 'Progress' },
    { key: 'started', title: 'Started Date' },
    { key: 'estimatedCompletion', title: 'Est. Completion' },
    { key: 'technician', title: 'Technician' }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Processing</h1>
      <p className="page-subtitle">Monitor device processing workflow and progress</p>
      
      {/* Summary Cards */}
      <div className="dashboard-grid">
        {summaryData.map((item, index) => (
          <SummaryCard key={index} {...item} />
        ))}
      </div>

      {/* Processing Queue Table */}
      <DataTable
        title="Processing Queue"
        data={tableData}
        columns={tableColumns}
      />
    </div>
  );
};

export default Processing;
