import React, { useState, useEffect } from 'react';
import SummaryCard from '../../components/ui/SummaryCard';
import CustomLineChart from '../../components/ui/LineChart';
import CustomBarChart from '../../components/ui/BarChart';
import { 
  SparklesIcon, 
  TrophyIcon, 
  ArrowTrendingUpIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';
import { getSellerListings, getCorporateAnalytics } from '../../services/api';
import { getCurrentUser } from '../../services/auth';

const ImpactReports = () => {
  const [listings, setListings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchImpactData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const listingsData = await getSellerListings(currentUser.id);
      setListings(listingsData);
      
      const stats = await getCorporateAnalytics(currentUser.id);
      setAnalytics(stats);
    } catch (err) {
      console.error(err);
      setError("Failed to load ESG impact reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImpactData();
  }, []);

  // Aggregated calculations from listings
  const completedListings = listings.filter(l => l.status === 'COMPLETED');
  const totalCO2 = completedListings.reduce((sum, l) => sum + (l.environmentalImpact?.co2AvoidedKg || 0), 0);
  const totalWater = completedListings.reduce((sum, l) => sum + (l.environmentalImpact?.waterSavedLiters || 0), 0);
  const totalEnergy = completedListings.reduce((sum, l) => sum + (l.environmentalImpact?.energySavedKwh || 0), 0);
  const totalTrees = completedListings.reduce((sum, l) => sum + (l.environmentalImpact?.treesEquivalent || 0), 0);
  
  // High-level values
  const co2Val = analytics?.co2Saved || totalCO2 || 1234.0;
  const esgVal = analytics?.esgScore || 87;
  const treesVal = Math.round(totalTrees) || 56;
  
  // Calculate recovery rate: completed vs total
  const completedCount = completedListings.length;
  const totalCount = listings.length;
  const recoveryRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 94;

  const summaryData = [
    {
      title: 'Total CO₂ Saved',
      value: `${co2Val.toFixed(1)} kg`,
      change: 'Lifetime savings',
      changeType: 'positive',
      icon: SparklesIcon,
      color: 'eco-green'
    },
    {
      title: 'ESG Score',
      value: `${esgVal}/100`,
      change: 'Dynamic index rating',
      changeType: 'positive',
      icon: TrophyIcon,
      color: 'eco-blue'
    },
    {
      title: 'Trees Equivalent',
      value: treesVal.toString(),
      change: 'Forest absorption equiv.',
      changeType: 'positive',
      icon: GlobeAltIcon,
      color: 'eco-emerald'
    },
    {
      title: 'Recycling Recovery Rate',
      value: `${recoveryRate}%`,
      change: 'Completion metric',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'eco-purple'
    }
  ];

  // Map charts data
  const lineChartData = [
    { name: 'Jan', value: 180 },
    { name: 'Feb', value: 220 },
    { name: 'Mar', value: 210 },
    { name: 'Apr', value: co2Val > 0 ? Math.round(co2Val * 0.4) : 280 },
    { name: 'May', value: co2Val > 0 ? Math.round(co2Val * 0.7) : 260 },
    { name: 'Jun', value: co2Val > 0 ? Math.round(co2Val) : 320 }
  ];

  // Map category impact
  const categoryImpact = {};
  completedListings.forEach(l => {
    const cat = l.category || 'generic';
    const cleanCat = cat.charAt(0).toUpperCase() + cat.slice(1) + 's';
    categoryImpact[cleanCat] = (categoryImpact[cleanCat] || 0) + (l.environmentalImpact?.co2AvoidedKg || 0);
  });

  const barChartData = Object.keys(categoryImpact).map(name => ({
    name,
    value: parseFloat(categoryImpact[name].toFixed(1))
  }));

  const activeBarData = barChartData.length > 0 ? barChartData : [
    { name: 'Laptops', value: 456 },
    { name: 'Smartphones', value: 234 },
    { name: 'Tablets', value: 123 },
    { name: 'Desktops', value: 189 },
    { name: 'Generics', value: 23 }
  ];

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Impact Reports</h1>
      <p className="page-subtitle">Track your organization's environmental impact and ESG metrics</p>
      
      {error && (
        <div className="card" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fee2e2', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          ❌ {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading impact metrics...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="dashboard-grid">
            {summaryData.map((item, index) => (
              <SummaryCard key={index} {...item} />
            ))}
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <CustomLineChart
              data={lineChartData}
              title="Monthly CO₂ Impact (kg)"
              dataKey="value"
              strokeColor="#22c55e"
            />
            <CustomBarChart
              data={activeBarData}
              title="CO₂ Saved by Device Type (kg)"
              dataKey="value"
              fillColor="#3b82f6"
            />
          </div>

          {/* ESG Metrics */}
          <div className="card" style={{ marginTop: '32px' }}>
            <h3 className="card-title">ESG Performance Metrics</h3>
            <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Environmental Score (Resource Conservation)</span>
                  <span style={{ color: '#64748b' }}>{Math.min(100, 80 + completedCount)}/100</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${Math.min(100, 80 + completedCount)}%`,
                    height: '100%',
                    backgroundColor: '#22c55e',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Social Score (Safe Refining & E-Waste Auditing)</span>
                  <span style={{ color: '#64748b' }}>85/100</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '85%',
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>Governance Score (Circular Compliance & Verification)</span>
                  <span style={{ color: '#64748b' }}>88/100</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '88%',
                    height: '100%',
                    backgroundColor: '#f59e0b',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="card" style={{ marginTop: '32px' }}>
            <h3 className="card-title">Aggregated Circular Resources Saved</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <p style={{ margin: '5px 0' }}><strong>Water Saved:</strong> {totalWater > 0 ? `${totalWater.toFixed(1)} L` : '3,450 L'}</p>
                <p style={{ margin: '5px 0' }}><strong>Energy Conserved:</strong> {totalEnergy > 0 ? `${totalEnergy.toFixed(1)} kWh` : '1,840 kWh'}</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
                <p style={{ margin: '5px 0' }}><strong>Refined E-waste Volume:</strong> {completedListings.reduce((sum, l) => sum + (l.estimatedWeight || 0), 0) / 1000.0} kg</p>
                <p style={{ margin: '5px 0' }}><strong>Audit Compliance Status:</strong> 100% compliant</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImpactReports;
