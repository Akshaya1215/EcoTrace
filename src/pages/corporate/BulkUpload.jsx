import React, { useState, useRef } from 'react';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { bulkUploadListings } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const BulkUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadResults, setUploadResults] = useState(null);
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    department: '',
    contactPerson: '',
    contactEmail: '',
    pickupDate: '',
    specialInstructions: ''
  });

  const fileInputRef = useRef(null);
  const currentUser = getCurrentUser();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    // Check extension rather than mime type since xlsx mime types can vary on different OS/browsers
    const name = file.name.toLowerCase();
    const isAllowed = name.endswith('.csv') || name.endswith('.xlsx') || name.endswith('.xls');

    if (!isAllowed) {
      setErrors((prev) => ({ ...prev, file: 'Only CSV or Excel files allowed (.csv, .xlsx, .xls)' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File must be under 5MB' }));
      return;
    }

    setErrors((prev) => ({ ...prev, file: null }));
    setSelectedFile(file);
    setUploadResults(null);
    setApiError(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.department)
      newErrors.department = 'Department is required';

    if (!formData.contactPerson)
      newErrors.contactPerson = 'Contact person is required';

    if (!formData.contactEmail)
      newErrors.contactEmail = 'Email is required';

    if (!selectedFile)
      newErrors.file = 'Please upload a file';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError(null);
    setUploadResults(null);

    try {
      const result = await bulkUploadListings(selectedFile, currentUser.id);
      setUploadResults(result);
      setSelectedFile(null);
      
      // Reset form
      setFormData({
        department: '',
        contactPerson: '',
        contactEmail: '',
        pickupDate: '',
        specialInstructions: ''
      });
      alert('Bulk upload completed! Check results summary.');
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Failed to process bulk upload. Please check file columns.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Bulk Upload</h1>
      <p className="page-subtitle">
        Submit multiple devices for recycling via CSV or Excel
      </p>
      
      {apiError && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto 20px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px' }}>
          ❌ {apiError}
        </div>
      )}

      {uploadResults && (
        <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto 30px', border: '2px solid var(--color-green)' }}>
          <h3 className="card-title">📈 Bulk Upload Import Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '20px 0' }}>
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Total Rows Processed</p>
              <h2 style={{ margin: '5px 0 0 0' }}>{uploadResults.totalRows}</h2>
            </div>
            <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#16a34a', fontSize: '13px' }}>Valid Rows (Imported)</p>
              <h2 style={{ margin: '5px 0 0 0', color: '#16a34a' }}>{uploadResults.validRows}</h2>
            </div>
            <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#b91c1c', fontSize: '13px' }}>Invalid Rows (Skipped)</p>
              <h2 style={{ margin: '5px 0 0 0', color: '#b91c1c' }}>{uploadResults.invalidRowsCount}</h2>
            </div>
          </div>

          {uploadResults.invalidRowsCount > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: '#b91c1c', marginBottom: '10px' }}>Validation Failures:</h4>
              <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #fee2e2', borderRadius: '6px', padding: '10px', background: '#fff' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '6px' }}>Row</th>
                      <th style={{ padding: '6px' }}>Device</th>
                      <th style={{ padding: '6px' }}>Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadResults.invalidRows.map((err, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px', fontWeight: 'bold' }}>{err.row}</td>
                        <td style={{ padding: '6px' }}>{err.data.model || err.data.modelname || err.data.device || 'N/A'}</td>
                        <td style={{ padding: '6px', color: '#b91c1c' }}>{err.errors.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>

          {/* Template Download Alert */}
          <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '8px', fontSize: '13px', color: '#475569', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
            ℹ️ **CSV Headers required:** `modelName` (or `deviceModel`), `location` (or `place`), `contactDetails`, `condition`, `ewasteDescription`.
          </div>

          {/* Upload Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragging
                ? '2px dashed #22c55e'
                : '2px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '30px',
              background: '#f9fafb'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />

            <CloudArrowUpIcon
              style={{
                width: '22px',
                height: '22px',
                color: '#94a3b8',
                display: 'block',
                margin: '0 auto 10px'
              }}
            />

            <p style={{ fontWeight: 500, marginBottom: '4px' }}>
              Drag & Drop your file here
            </p>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              or click to browse (CSV / Excel)
            </p>

            {errors.file && (
              <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>
                {errors.file}
              </p>
            )}
          </div>

          {/* File Preview */}
          {selectedFile && (
            <div
              style={{
                marginBottom: '24px',
                padding: '12px',
                background: '#f0fdf4',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <DocumentTextIcon
                style={{ width: '24px', height: '24px', color: '#16a34a' }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  {selectedFile.name}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <CheckCircleIcon
                style={{ width: '20px', height: '20px', color: '#16a34a' }}
              />
            </div>
          )}

          {/* Form Fields */}
          <div style={{ display: 'grid', gap: '20px' }}>

            <div>
              <label className="form-label">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
              />
              {errors.department && <p style={{ color: 'red', fontSize: '13px' }}>{errors.department}</p>}
            </div>

            <div>
              <label className="form-label">Contact Person *</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="form-input"
              />
              {errors.contactPerson && <p style={{ color: 'red', fontSize: '13px' }}>{errors.contactPerson}</p>}
            </div>

            <div>
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="form-input"
              />
              {errors.contactEmail && <p style={{ color: 'red', fontSize: '13px' }}>{errors.contactEmail}</p>}
            </div>

            <div>
              <label className="form-label">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                className="form-input"
                rows={3}
              />
            </div>

          </div>

          {/* Submit Button */}
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: '12px 28px',
                borderRadius: '8px'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Submit Bulk Upload'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BulkUpload;