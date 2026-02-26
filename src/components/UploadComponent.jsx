import React, { useState } from 'react';
import { 
  CloudArrowUpIcon,
  CameraIcon,
  DocumentTextIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const UploadComponent = ({ onUpload, onAnalyze }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({
    name: '',
    condition: 'good',
    description: ''
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    if (onUpload) {
      onUpload(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceInfo({
      ...deviceInfo,
      [name]: value
    });
  };

  const handleAnalyze = () => {
    if (onAnalyze) {
      onAnalyze({
        file: uploadedFile,
        ...deviceInfo
      });
    }
  };

  return (
    <div className="upload-component">
      {/* File Upload Area */}
      <div className="upload-area">
        <div 
          className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="upload-content">
            {uploadedFile ? (
              <div className="uploaded-file">
                <DocumentTextIcon className="w-12 h-12 text-green-600" />
                <p className="file-name">{uploadedFile.name}</p>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <CloudArrowUpIcon className="w-16 h-16 text-gray-400" />
                <h3>Upload Device Photo</h3>
                <p>Drag and drop or click to browse</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                />
                <label htmlFor="file-upload" className="btn btn-secondary">
                  <CameraIcon />
                  Choose File
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Device Information */}
      <div className="device-info">
        <h3>Device Information</h3>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Device Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={deviceInfo.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., iPhone 12 Pro, Dell Laptop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition" className="form-label">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={deviceInfo.condition}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="excellent">Excellent - Like New</option>
            <option value="good">Good - Minor Wear</option>
            <option value="fair">Fair - Visible Wear</option>
            <option value="poor">Poor - Damaged</option>
            <option value="broken">Broken - Not Working</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={deviceInfo.description}
            onChange={handleInputChange}
            className="form-input"
            rows="3"
            placeholder="Any additional details about the device..."
          />
        </div>
      </div>

      {/* Analyze Button */}
      <div className="analyze-section">
        <button
          className="btn btn-primary btn-full btn-large"
          onClick={handleAnalyze}
          disabled={!uploadedFile || !deviceInfo.name}
        >
          <SparklesIcon />
          Analyze with AI
        </button>
        <p className="analyze-note">
          Our AI will identify components and estimate recycling value
        </p>
      </div>
    </div>
  );
};

export default UploadComponent;
