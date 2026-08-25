import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import SummaryCard from '../../components/ui/SummaryCard';
import { ArrowPathIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getAcceptedListings, recordRecoveredMaterials, createTransaction, completeTransaction, updateListingStatus } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const Processing = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Recording materials state
  const [recordingListing, setRecordingListing] = useState(null);
  const [materialsForm, setMaterialsForm] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAcceptedListings(currentUser.id);
      // Filter listings in processing workflow stages
      const filtered = data.filter(item => 
        ['PROCESSING', 'MATERIAL_RECOVERED', 'PAYMENT_PENDING', 'COMPLETED'].includes(item.status)
      );
      setListings(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to load processing queue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleStartRecording = (item) => {
    setRecordingListing(item);
    
    // Combine base materials and precious metals into a single inputs list
    const mats = (item.materials || []).map(m => ({
      material: m.material,
      estimatedWeight: m.estimatedGrams || 0,
      recoveredWeight: m.estimatedGrams || 0 // pre-populate with estimate
    }));
    
    const precious = (item.aiAnalysis?.preciousMetals || []).map(p => ({
      material: p.name,
      estimatedWeight: p.grams || 0,
      recoveredWeight: p.grams || 0 // pre-populate with estimate
    }));
    
    setMaterialsForm([...mats, ...precious]);
  };

  const handleWeightChange = (index, val) => {
    const updated = [...materialsForm];
    updated[index].recoveredWeight = val === '' ? 0 : parseFloat(val);
    setMaterialsForm(updated);
  };

  const handleMaterialsSubmit = async (e) => {
    e.preventDefault();
    if (!recordingListing) return;
    setIsSubmitting(true);
    
    try {
      // Record recovered weights
      const result = await recordRecoveredMaterials(recordingListing.id, materialsForm);
      
      // Auto transition listing to PAYMENT_PENDING
      await updateListingStatus(recordingListing.id, 'PAYMENT_PENDING');
      
      // Auto create a transaction record in PENDING status
      await createTransaction({
        listingId: recordingListing.id,
        sellerId: recordingListing.sellerId,
        recyclerId: currentUser.id,
        amount: result.finalRecoveryValue || recordingListing.estimatedRecoveryValue?.estimatedValue || 0
      });
      
      alert("Recovered materials recorded and payment initiated!");
      setRecordingListing(null);
      setMaterialsForm([]);
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to record materials");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProcessPayment = async (item) => {
    if (!window.confirm(`Initiate Demo Payment of ₹ ${item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0} to seller?`)) return;
    
    try {
      // Complete transaction (using transactionId linked to listing or finding it)
      if (item.transactionId) {
        await completeTransaction(item.transactionId);
        alert("Demo Payment processed successfully!");
        fetchListings();
      } else {
        // Fallback: create and complete transaction
        const txnRes = await createTransaction({
          listingId: item.id,
          sellerId: item.sellerId,
          recyclerId: currentUser.id,
          amount: item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0
        });
        await completeTransaction(txnRes.transaction.id);
        alert("Demo Payment processed successfully!");
        fetchListings();
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to process payment");
    }
  };

  const getStatusProgress = (status) => {
    const progressMap = {
      PROCESSING: '25%',
      MATERIAL_RECOVERED: '50%',
      PAYMENT_PENDING: '75%',
      COMPLETED: '100%'
    };
    return progressMap[status] || '0%';
  };

  const countByStatus = (status) => {
    return listings.filter(item => item.status === status).length;
  };

  const summaryData = [
    {
      title: 'Processing Queue',
      value: listings.filter(item => item.status !== 'COMPLETED').length.toString(),
      change: 'Active lots',
      changeType: 'neutral',
      icon: ClockIcon,
      color: 'eco-blue'
    },
    {
      title: 'In Progress',
      value: countByStatus('PROCESSING').toString(),
      change: 'Disassembly / Sorting',
      changeType: 'positive',
      icon: ArrowPathIcon,
      color: 'eco-green'
    },
    {
      title: 'Payments Pending',
      value: countByStatus('PAYMENT_PENDING').toString(),
      change: 'Awaiting settlement',
      changeType: 'negative',
      icon: ExclamationTriangleIcon,
      color: 'eco-red'
    },
    {
      title: 'Completed today',
      value: countByStatus('COMPLETED').toString(),
      change: 'Processed to raw stock',
      changeType: 'positive',
      icon: CheckCircleIcon,
      color: 'eco-emerald'
    }
  ];

  const tableData = listings.map(item => ({
    id: item.id,
    sellerId: item.sellerId,
    transactionId: item.transactionId,
    device: item.deviceName,
    batch: `BATCH-${item.id.slice(-4).toUpperCase()}`,
    stage: item.status.replace(/_/g, ' '),
    progress: getStatusProgress(item.status),
    started: item.acceptedAt ? new Date(item.acceptedAt).toLocaleDateString() : 'N/A',
    value: `₹ ${item.finalRecoveryValue || item.estimatedRecoveryValue?.estimatedValue || 0}`,
    originalItem: item // hold original item reference
  }));

  const tableColumns = [
    { key: 'device', title: 'Device Model' },
    { key: 'batch', title: 'Batch ID' },
    { 
      key: 'stage', 
      title: 'Processing Stage',
      render: (stage) => (
        <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 600 }} className="status-badge processing">
          {stage}
        </span>
      )
    },
    { key: 'progress', title: 'Progress' },
    { key: 'started', title: 'Started Date' },
    { key: 'value', title: 'Recovery Value' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          {row.originalItem.status === 'PROCESSING' && (
            <button
              onClick={() => handleStartRecording(row.originalItem)}
              className="btn btn-primary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              Record Materials
            </button>
          )}
          {row.originalItem.status === 'MATERIAL_RECOVERED' && (
            <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>
              Materials Logged
            </span>
          )}
          {row.originalItem.status === 'PAYMENT_PENDING' && (
            <button
              onClick={() => handleProcessPayment(row.originalItem)}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#16a34a', color: '#fff' }}
            >
              Process Payment
            </button>
          )}
          {row.originalItem.status === 'COMPLETED' && (
            <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 500 }}>
              ✅ Fully Processed
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Processing</h1>
      <p className="page-subtitle">Monitor e-waste refining, recovery and payment settlement</p>
      
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

      {/* Record Materials Form */}
      {recordingListing && (
        <div className="card animate-fade-in" style={{ maxWidth: '750px', margin: '0 auto 30px', border: '2px solid var(--accent-primary)' }}>
          <h3 className="card-title">Record Recovered Materials: {recordingListing.deviceName}</h3>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>
            Weigh and record actual extracted commodity yields in grams. Est. Total: {recordingListing.estimatedWeight}g
          </p>
          <form onSubmit={handleMaterialsSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 30px', marginBottom: '20px' }}>
              {materialsForm.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <span style={{ fontWeight: 500, fontSize: '14px', textTransform: 'capitalize' }}>{item.material}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Est: {item.estimatedWeight.toFixed(2)}g</span>
                    <input
                      type="number"
                      step="0.001"
                      value={item.recoveredWeight}
                      onChange={(e) => handleWeightChange(index, e.target.value)}
                      className="form-input"
                      style={{ width: '100px', padding: '6px', textAlign: 'right' }}
                      required
                    />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>g</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setRecordingListing(null)}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Log Yields & Issue Payment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading processing queue...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No lots currently in the refining pipeline.</p>
        </div>
      ) : (
        /* Processing Queue Table */
        <DataTable
          title="Active Refining Batches"
          data={tableData}
          columns={tableColumns}
        />
      )}
    </div>
  );
};

export default Processing;
