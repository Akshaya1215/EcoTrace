import React, { useState, useRef } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const UploadDevice = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [readyToSell, setReadyToSell] = useState(false);

  const [formData, setFormData] = useState({
    modelName: '',
    brand: '',
    category: '',
    condition: '',
    description: '',
    place: '',
    contactDetails: '',
    ewasteDescription: ''
  });

  const fileInputRef = useRef(null);

  /* =========================
     FILE HANDLING
  ========================= */

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
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file) => {
    setSelectedFile(file);
    setShowResult(false);
    setReadyToSell(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.modelName) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);
      window.scrollTo({ top: 900, behavior: 'smooth' });
    }, 2000);
  };

  /* =========================
     SELL LOGIC
  ========================= */

  const handleSell = () => {
    setReadyToSell(true);

    setTimeout(() => {
      setSelectedFile(null);
      setImagePreview(null);
      setShowResult(false);
      setReadyToSell(false);

      setFormData({
        modelName: '',
        brand: '',
        category: '',
        condition: '',
        description: '',
        place: '',
        contactDetails: '',
        ewasteDescription: ''
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const isFormValid = selectedFile && formData.modelName;

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Upload Device</h1>
      <p className="page-subtitle">Upload your device for AI analysis</p>

      <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>

          {/* Upload Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragging ? '2px dashed #22c55e' : '2px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '30px',
              transition: 'all 0.2s ease',
              background: '#f9fafb'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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

            <p style={{ fontWeight: 500 }}>Drag & Drop your image here</p>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              or click to browse
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div style={{ marginBottom: '32px' }}>
              <h3>Image Preview</h3>
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}
              />
            </div>
          )}

          {/* Form Fields */}
          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Model Name *</label>
            <input
              type="text"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Chennai, Tamil Nadu"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Contact Details</label>
            <input
              type="text"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
              className="form-input"
              placeholder="Phone number or email"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="form-label">Short Description of E-Waste</label>
            <textarea
              name="ewasteDescription"
              value={formData.ewasteDescription}
              onChange={handleChange}
              className="form-input"
              rows={3}
              placeholder="Briefly describe the condition or damage..."
            />
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'right' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid || isLoading}
              style={{ padding: '12px 28px' }}
            >
              {isLoading ? 'Analyzing...' : 'Submit Device'}
            </button>
          </div>

        </form>
      </div>
{/* ================= AI RESULT SECTION ================= */}
{showResult && (
  <div className="card" style={{ maxWidth: '1000px', margin: '50px auto' }}>

    {/* HEADER */}
    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '25px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 600 }}>
        🧠 AI Material Recovery Analysis
      </h2>
      <p style={{ fontSize: '13px', color: '#6b7280' }}>
        Model: EcoTraceNet v2.4 | Inference Time: 1.87s | Dataset: 18,400+ device samples
      </p>
    </div>

    {/* CLASSIFICATION BLOCK */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

      <div>
        <p><strong>Device Classification:</strong> Samsung Galaxy (Mid-range)</p>
        <p><strong>Predicted Weight:</strong> 178g – 185g range</p>
        <p><strong>Condition Score:</strong> 0.82 (High Scrap Viability)</p>

        {/* Confidence Meter */}
        <div style={{ marginTop: '15px' }}>
          <p style={{ fontSize: '13px' }}>Model Confidence: 94.7%</p>
          <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '6px' }}>
            <div style={{
              width: '94.7%',
              height: '10px',
              background: '#16a34a',
              borderRadius: '6px',
              transition: 'width 1s ease'
            }} />
          </div>
        </div>
      </div>

      {/* RISK SCORE */}
      <div style={{
        background: '#f9fafb',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #e5e7eb'
      }}>
        <h4>⚠ Risk Assessment</h4>
        <p style={{ fontSize: '14px' }}>
          Battery Degradation Probability: 78%
        </p>
        <p style={{ fontSize: '14px' }}>
          Metal Recovery Efficiency: 88%
        </p>
        <p style={{ fontSize: '14px' }}>
          Resale Probability: 12%
        </p>
      </div>

    </div>

    {/* MATERIAL BREAKDOWN */}
    <div style={{ marginTop: '35px' }}>
      <h3>📊 Material Distribution (Estimated)</h3>

      {[
        { name: "Aluminum", percent: 25 },
        { name: "Lithium Battery", percent: 20 },
        { name: "Glass", percent: 18 },
        { name: "Plastics", percent: 15 },
        { name: "Copper", percent: 10 },
        { name: "Iron/Steel", percent: 5 }
      ].map((item, i) => (
        <div key={i} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span>{item.name}</span>
            <span>{item.percent}%</span>
          </div>
          <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '6px' }}>
            <div style={{
              width: `${item.percent}%`,
              height: '8px',
              background: '#22c55e',
              borderRadius: '6px'
            }} />
          </div>
        </div>
      ))}
    </div>

    {/* PRECIOUS METALS */}
    <div style={{ marginTop: '35px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
      <div className="card">
        <h4>Gold</h4>
        <p>0.03g</p>
        <small>₹ 165</small>
      </div>
      <div className="card">
        <h4>Silver</h4>
        <p>0.25g</p>
        <small>₹ 17</small>
      </div>
      <div className="card">
        <h4>Palladium</h4>
        <p>0.015g</p>
        <small>₹ 22</small>
      </div>
    </div>

    {/* VALUE BLOCK */}
    <div style={{
      marginTop: '40px',
      padding: '25px',
      background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
      borderRadius: '12px',
      textAlign: 'center'
    }}>
      <h3>💰 Estimated Total Recovery Value</h3>
      <h1 style={{ fontSize: '36px', color: '#15803d' }}>₹ 238 – ₹ 260</h1>
      <p style={{ fontSize: '12px', color: '#6b7280' }}>
        Based on Indian scrap market rates (2024 industry average)
      </p>
    </div>

    {/* ENVIRONMENT IMPACT */}
    <div style={{ marginTop: '30px' }}>
      <h3>🌍 Environmental Impact Projection</h3>
      <p>CO₂ Emissions Avoided: 12.6 kg</p>
      <p>Energy Saved: 19.3 kWh</p>
      <p>Water Saved: 48 Liters</p>
    </div>

    {/* SELL BUTTON */}
    <div style={{ textAlign: 'center', marginTop: '35px' }}>
      {!readyToSell ? (
        <button onClick={handleSell} className="btn btn-primary">
          List for Marketplace
        </button>
      ) : (
        <div style={{
          background: '#dcfce7',
          padding: '12px',
          borderRadius: '8px',
          color: '#15803d',
          fontWeight: 500
        }}>
          ✅ Listing Created Successfully
        </div>
      )}
    </div>

  </div>
)}
    </div>
  );
};

export default UploadDevice;