import React, { useState, useRef } from 'react';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const BulkUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    department: '',
    contactPerson: '',
    contactEmail: '',
    pickupDate: '',
    specialInstructions: ''
  });

  const fileInputRef = useRef(null);

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

    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, file: 'Only CSV or Excel files allowed' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'File must be under 5MB' }));
      return;
    }

    setErrors((prev) => ({ ...prev, file: null }));
    setSelectedFile(file);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert('Bulk upload submitted successfully!');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Bulk Upload</h1>
      <p className="page-subtitle">
        Submit multiple devices for recycling
      </p>
      

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>

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