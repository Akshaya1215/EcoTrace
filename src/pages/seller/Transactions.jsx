import React from "react";

const Transactions = () => {

  // Dummy realistic transaction data (INR market)
  const transactions = [
    {
      id: "TXN-1001",
      device: "iPhone 12 Pro",
      recycler: "GreenCycle Pvt Ltd",
      date: "2026-02-22",
      amount: "₹8,200",
      status: "Paid"
    },
    {
      id: "TXN-1002",
      device: "MacBook Air 2020",
      recycler: "EcoMetal Recyclers",
      date: "2026-02-20",
      amount: "₹18,500",
      status: "Processing"
    },
    {
      id: "TXN-1003",
      device: "Samsung Galaxy S21",
      recycler: "Urban Scrap Solutions",
      date: "2026-02-18",
      amount: "₹6,700",
      status: "Paid"
    },
    {
      id: "TXN-1004",
      device: "Dell XPS 13",
      recycler: "GreenCycle Pvt Ltd",
      date: "2026-02-15",
      amount: "₹14,200",
      status: "Failed"
    }
  ];

  // Calculate total earnings (only paid)
  const totalEarnings = transactions
    .filter(t => t.status === "Paid")
    .reduce((sum, t) => sum + Number(t.amount.replace(/[₹,]/g, "")), 0);

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <p className="page-subtitle">
          View all your completed and pending payments
        </p>
      </div>

      {/* Earnings Summary */}
      <div className="card" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "8px" }}>Total Earnings (Paid)</h3>
        <h2 style={{ color: "#16a34a" }}>₹{totalEarnings.toLocaleString()}</h2>
      </div>

      {/* Transactions Table */}
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
                  <td>{item.device}</td>
                  <td>{item.recycler}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Paid"
                          ? "completed"
                          : item.status === "Processing"
                          ? "processing"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Transactions;