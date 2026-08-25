import React, { useState, useEffect } from "react";
import { getTransactions } from "../../services/api";
import { getCurrentUser } from "../../services/auth";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTransactions(currentUser.role, currentUser.id);
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate total earnings (only COMPLETED)
  const totalEarnings = transactions
    .filter(t => t.status === "COMPLETED")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const getRecyclerName = (recyclerId) => {
    const recyclers = {
      recycler_demo_001: "GreenCycle Pvt Ltd",
      recycler_demo_002: "EcoMetal Recyclers",
      recycler_demo_003: "Urban Scrap Solutions"
    };
    return recyclers[recyclerId] || recyclerId || "Demo Recycler";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "COMPLETED":
        return "completed";
      case "PROCESSING":
      case "PENDING":
        return "processing";
      case "FAILED":
      case "CANCELLED":
        return "cancelled";
      default:
        return "pending";
    }
  };

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <p className="page-subtitle">
          View all your completed and pending payments
        </p>
      </div>

      {error && (
        <div className="card" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fee2e2", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          ❌ {error}
        </div>
      )}

      {/* Earnings Summary */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "8px" }}>Total Earnings (Paid)</h3>
        <h2 style={{ color: "#16a34a" }}>₹ {totalEarnings.toLocaleString()}</h2>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>No transactions found.</p>
        </div>
      ) : (
        /* Transactions Table */
        <div className="table-container">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Device</th>
                  <th>Recycler</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.deviceName}</td>
                    <td>{getRecyclerName(item.recyclerId)}</td>
                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td>₹ {item.amount.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Transactions;