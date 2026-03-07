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
      <h3 style={{ marginBottom: "16px", color: "var(--color-beige)" }}>Environmental Impact</h3>

      <div className="dashboard-grid">

        <div className="card">
          <h4>Total CO₂ Saved</h4>
          <h2 style={{ color: "var(--color-terracotta)" }}>
            {impactData.totalCO2} kg
          </h2>
        </div>

        <div className="card">
          <h4>Total E-Waste Recycled</h4>
          <h2 style={{ color: "var(--color-green)" }}>{impactData.totalEWaste} kg</h2>
        </div>

        <div className="card">
          <h4>Trees Equivalent Saved</h4>
          <h2 style={{ color: "var(--color-green)" }}>{impactData.treesEquivalent} 🌳</h2>
        </div>

        <div className="card">
          <h4>Energy Saved</h4>
          <h2 style={{ color: "var(--color-green)" }}>{impactData.energySaved} kWh</h2>
        </div>

      </div>

      {/* ================= REWARDS SECTION ================= */}
      <h3 style={{ margin: "40px 0 16px", color: "var(--color-beige)" }}>Rewards & Tier Status</h3>

      <div className="card">

        <div style={{ marginBottom: "20px" }}>
          <h4>Current Tier</h4>
          <h2 style={{ color: "var(--color-terracotta)" }}>
            {rewardsData.tier} Member
          </h2>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h4>Total Green Points</h4>
          <h2 style={{ color: "var(--color-green)" }}>{rewardsData.totalPoints} pts</h2>
        </div>

        {/* Progress Bar */}
        <div>
          <h4>Progress to {rewardsData.nextTier}</h4>

          <div
            style={{
              height: "12px",
              background: "rgba(74, 74, 74, 0.2)",
              borderRadius: "8px",
              overflow: "hidden",
              marginTop: "8px"
            }}
          >
            <div
              style={{
                width: `${(rewardsData.totalPoints / 2000) * 100}%`,
                background: "var(--gradient-progress)",
                height: "100%"
              }}
            />
          </div>

          <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--color-grey)", fontWeight: "500" }}>
            {rewardsData.pointsToNext} points needed to reach {rewardsData.nextTier}
          </p>
        </div>

      </div>

    </div>
  );
};

export default ImpactRewards;