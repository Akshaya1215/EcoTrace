import React, { useState, useRef } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { analyzeDevice, createListing } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const UploadDevice = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [readyToSell, setReadyToSell] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [apiError, setApiError] = useState(null);

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
    setAiResult(null);
    setApiError(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !formData.modelName) return;

    setIsLoading(true);
    setApiError(null);
    setAiResult(null);

    try {
      const data = new FormData();
      data.append('image', selectedFile);
      data.append('modelName', formData.modelName);
      data.append('place', formData.place);
      data.append('contactDetails', formData.contactDetails);
      data.append('ewasteDescription', formData.ewasteDescription);
      data.append('condition', 'good'); // default condition

      const result = await analyzeDevice(data);
      setAiResult(result);
      setShowResult(true);
      setTimeout(() => {
        const resultSection = document.getElementById('ai-result-section');
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Failed to analyze device. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     SELL LOGIC
  ========================= */

  const handleSell = async () => {
    if (!aiResult) return;
    setIsLoading(true);
    setApiError(null);
    
    try {
      const user = getCurrentUser();
      const listingData = {
        sellerId: user.id,
        sellerName: user.name,
        deviceName: aiResult.device.model,
        brand: aiResult.device.brand,
        category: aiResult.device.category,
        image: imagePreview, // Save base64 image preview for listing image
        condition: aiResult.condition,
        location: formData.place || 'Unknown',
        contactDetails: formData.contactDetails || 'None',
        aiAnalysis: aiResult,
        estimatedWeight: aiResult.estimatedWeightGrams,
        materials: aiResult.materials,
        estimatedRecoveryValue: aiResult.valuation,
        environmentalImpact: aiResult.environmentalImpact,
        status: 'AVAILABLE'
      };
      
      await createListing(listingData);
      setReadyToSell(true);

      setTimeout(() => {
        setSelectedFile(null);
        setImagePreview(null);
        setShowResult(false);
        setReadyToSell(false);
        setAiResult(null);

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
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Failed to list device. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = selectedFile && formData.modelName;

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Upload Device</h1>
      <p className="page-subtitle">Upload your device for AI analysis</p>

      {apiError && (
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto 20px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px' }}>
          ❌ {apiError}
        </div>
      )}

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
      {showResult && aiResult && (
        <div id="ai-result-section" className="card" style={{ maxWidth: '1000px', margin: '50px auto' }}>

          {/* HEADER */}
          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 600 }}>
              🧠 AI-assisted estimate (Reference-based)
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              Model: EcoTraceNet v2.4 (Demo AI analysis) | Inference Time: {aiResult.inferenceTimeSeconds}s | AI Provider: {aiResult.aiProvider}
            </p>
          </div>

          {/* CLASSIFICATION BLOCK */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

            <div>
              <p><strong>Device Classification:</strong> {aiResult.device.className}</p>
              <p><strong>Predicted Weight:</strong> {aiResult.estimatedWeightGrams}g</p>
              <p><strong>Condition Score:</strong> {aiResult.conditionConfidence} (Scrap Viability)</p>

              {/* Confidence Meter */}
              <div style={{ marginTop: '15px' }}>
                <p style={{ fontSize: '13px' }}>Model Confidence: {(aiResult.classificationConfidence * 100).toFixed(1)}%</p>
                <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '6px' }}>
                  <div style={{
                    width: `${(aiResult.classificationConfidence * 100)}%`,
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
                Battery Degradation Probability: {aiResult.riskAssessment.batteryDegradation}%
              </p>
              <p style={{ fontSize: '14px' }}>
                Metal Recovery Efficiency: {aiResult.riskAssessment.metalRecovery}%
              </p>
              <p style={{ fontSize: '14px' }}>
                Resale Probability: {aiResult.riskAssessment.resale}%
              </p>
            </div>

          </div>

          {/* MATERIAL BREAKDOWN */}
          <div style={{ marginTop: '35px' }}>
            <h3>📊 Material Distribution (Estimated)</h3>

            {aiResult.materials.map((item, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>{item.material}</span>
                  <span>{item.percentage.toFixed(1)}% ({item.estimatedGrams}g)</span>
                </div>
                <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '6px' }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '8px',
                    background: '#22c55e',
                    borderRadius: '6px'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* PRECIOUS METALS */}
          <div style={{ marginTop: '35px' }}>
            <h3>💎 Precious Metals Content (Estimated)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '10px' }}>
              {aiResult.preciousMetals.map((pm, i) => {
                const pmRate = aiResult.valuation.ratesApplied[pm.name] || 0;
                const pmVal = Math.round(pm.grams * pmRate);
                return (
                  <div key={i} className="card" style={{ padding: '15px', textAlign: 'center', background: '#fff' }}>
                    <h4 style={{ textTransform: 'capitalize', margin: '0 0 5px 0' }}>{pm.name}</h4>
                    <p style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 5px 0' }}>{pm.grams}g</p>
                    <small style={{ color: '#16a34a', fontWeight: 500 }}>₹ {pmVal}</small>
                  </div>
                );
              })}
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
            <h3>💰 Estimated Recovery Value</h3>
            <h1 style={{ fontSize: '36px', color: '#15803d' }}>
              ₹ {aiResult.valuation.minValue} – ₹ {aiResult.valuation.maxValue}
            </h1>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              Based on Indian scrap market rates (2024 industry average)
            </p>
          </div>

          {/* ENVIRONMENT IMPACT - REMOVED */}

          {/* SELL BUTTON */}
          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            {!readyToSell ? (
              <button onClick={handleSell} className="btn btn-primary" disabled={isLoading} style={{ padding: '12px 30px' }}>
                {isLoading ? 'Creating Listing...' : 'List for Marketplace'}
              </button>
            ) : (
              <div style={{
                background: '#dcfce7',
                padding: '12px',
                borderRadius: '8px',
                color: '#15803d',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                ✅ Listing Created Successfully! Redirecting...
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default UploadDevice;