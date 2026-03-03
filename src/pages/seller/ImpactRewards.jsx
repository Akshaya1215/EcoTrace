import React from "react";

const ImpactRewards = () => {

  // Dummy environmental impact data
  const impactData = {
    totalCO2: 234, // kg
    totalEWaste: 87, // kg
    treesEquivalent: 12,
    energySaved: 540 // kWh
  };

  // Dummy reward data
  const rewardsData = {
    totalPoints: 1450,
    tier: "Silver",
    nextTier: "Gold",
    pointsToNext: 550
  };

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Impact & Rewards</h1>
        <p className="page-subtitle">
          Track your environmental contribution and unlock green rewards
        </p>
      </div>

      {/* ================= IMPACT SECTION ================= */}
      <h3 style={{ marginBottom: "16px" }}>Environmental Impact</h3>

      <div className="dashboard-grid">

        <div className="card">
          <h4>Total CO₂ Saved</h4>
          <h2 style={{ color: "#16a34a" }}>
            {impactData.totalCO2} kg
          </h2>
        </div>

        <div className="card">
          <h4>Total E-Waste Recycled</h4>
          <h2>{impactData.totalEWaste} kg</h2>
        </div>

        <div className="card">
          <h4>Trees Equivalent Saved</h4>
          <h2>{impactData.treesEquivalent} 🌳</h2>
        </div>

        <div className="card">
          <h4>Energy Saved</h4>
          <h2>{impactData.energySaved} kWh</h2>
        </div>

      </div>

      {/* ================= REWARDS SECTION ================= */}
      <h3 style={{ margin: "40px 0 16px" }}>Rewards & Tier Status</h3>

      <div className="card">

        <div style={{ marginBottom: "20px" }}>
          <h4>Current Tier</h4>
          <h2 style={{ color: "#2563eb" }}>
            {rewardsData.tier} Member
          </h2>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4>Total Green Points</h4>
          <h2>{rewardsData.totalPoints} pts</h2>
        </div>

        {/* Progress Bar */}
        <div>
          <h4>Progress to {rewardsData.nextTier}</h4>

          <div
            style={{
              height: "12px",
              background: "#e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
              marginTop: "8px"
            }}
          >
            <div
              style={{
                width: `${(rewardsData.totalPoints / 2000) * 100}%`,
                background: "#22c55e",
                height: "100%"
              }}
            />
          </div>

          <p style={{ marginTop: "8px", fontSize: "14px", color: "#64748b" }}>
            {rewardsData.pointsToNext} points needed to reach {rewardsData.nextTier}
          </p>
        </div>

      </div>

    </div>
  );
};

export default ImpactRewards;