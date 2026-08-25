import React, { useState, useEffect } from "react";
import { getSellerAnalytics } from "../../services/api";
import { getCurrentUser } from "../../services/auth";

const ImpactRewards = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchImpact = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getSellerAnalytics(currentUser.id);
      setData(res);
    } catch (err) {
      console.error(err);
      setError("Failed to load environmental impact stats. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImpact();
  }, []);

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Impact & Rewards</h1>
        <p className="page-subtitle">
          Track your environmental contribution and unlock green rewards
        </p>
      </div>

      {error && (
        <div className="card" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fee2e2", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          ❌ {error}
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading impact details...</p>
        </div>
      ) : data ? (
        <>
          {/* ================= IMPACT SECTION ================= */}
          <h3 style={{ marginBottom: "16px", color: "var(--color-beige)" }}>Environmental Impact</h3>

          <div className="dashboard-grid">

            <div className="card">
              <h4>Total CO₂ Saved</h4>
              <h2 style={{ color: "var(--color-terracotta)" }}>
                {data.totalCO2Avoided} kg
              </h2>
            </div>

            <div className="card">
              <h4>Total E-Waste Recycled</h4>
              <h2 style={{ color: "var(--color-green)" }}>{data.totalEWasteRecycled} kg</h2>
            </div>

            <div className="card">
              <h4>Trees Equivalent Saved</h4>
              <h2 style={{ color: "var(--color-green)" }}>{data.treesEquivalent} 🌳</h2>
            </div>

            <div className="card">
              <h4>Energy Saved</h4>
              <h2 style={{ color: "var(--color-green)" }}>{data.totalEnergySaved} kWh</h2>
            </div>

          </div>

          {/* ================= REWARDS SECTION ================= */}
          <h3 style={{ margin: "40px 0 16px", color: "var(--color-beige)" }}>Rewards & Tier Status</h3>

          <div className="card">

            <div style={{ marginBottom: "20px" }}>
              <h4>Current Tier</h4>
              <h2 style={{ color: "var(--color-terracotta)" }}>
                {data.tier} Member
              </h2>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4>Total Green Points</h4>
              <h2 style={{ color: "var(--color-green)" }}>{data.totalPoints} pts</h2>
            </div>

            {/* Progress Bar */}
            <div>
              <h4>Progress to {data.nextTier}</h4>

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
                    width: `${Math.min(100, (data.totalPoints / (data.totalPoints + data.pointsToNext)) * 100)}%`,
                    background: "var(--gradient-progress)",
                    height: "100%"
                  }}
                />
              </div>

              <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--color-grey)", fontWeight: "500" }}>
                {data.pointsToNext} points needed to reach {data.nextTier}
              </p>
            </div>

          </div>
        </>
      ) : null}

    </div>
  );
};

export default ImpactRewards;