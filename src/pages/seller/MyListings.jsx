import React, { useState, useEffect } from "react";
import { getSellerListings, cancelListing } from "../../services/api";
import { getCurrentUser } from "../../services/auth";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = getCurrentUser();

  const fetchListings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSellerListings(currentUser.id);
      setListings(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleCancel = async (listingId) => {
    if (!window.confirm("Are you sure you want to cancel this listing?")) return;
    try {
      await cancelListing(listingId);
      // Refresh listings
      fetchListings();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to cancel listing");
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      AVAILABLE: "pending",
      ACCEPTED: "processing",
      PICKUP_SCHEDULED: "processing",
      COLLECTED: "processing",
      PROCESSING: "processing",
      MATERIAL_RECOVERED: "processing",
      PAYMENT_PENDING: "pending",
      COMPLETED: "completed",
      CANCELLED: "cancelled"
    };
    return statusMap[status] || "pending";
  };

  const formatStatusText = (status) => {
    return status.replace(/_/g, " ");
  };

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">My Listings</h1>
        <p className="page-subtitle">
          Track all devices you have uploaded for recycling
        </p>
      </div>

      {error && (
        <div className="card" style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fee2e2", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          ❌ {error}
        </div>
      )}

      {/* Listings Count */}
      <div style={{ marginBottom: "20px", fontWeight: 500 }}>
        Total Listings: {listings.length}
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading your listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "50px 20px" }}>
          <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "20px" }}>You have no listings yet.</p>
          <a href="/dashboard/upload" className="btn btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
            Upload First Device
          </a>
        </div>
      ) : (
        /* Table Container */
        <div className="table-container">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Device</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Estimated Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.deviceName}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "6px"
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "50px",
                          height: "50px",
                          background: "#e2e8f0",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          color: "#64748b"
                        }}>
                          No Image
                        </div>
                      )}
                    </td>
                    <td>{item.deviceName}</td>
                    <td style={{ textTransform: "capitalize" }}>{item.category}</td>
                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(item.status)}`}
                        style={{ textTransform: "uppercase", fontSize: "11px", fontWeight: 600 }}
                      >
                        {formatStatusText(item.status)}
                      </span>
                    </td>
                    <td>₹ {item.estimatedRecoveryValue?.estimatedValue || 0}</td>
                    <td>
                      {item.status === "AVAILABLE" && (
                        <button 
                          onClick={() => handleCancel(item.id)}
                          className="btn btn-danger"
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                        >
                          Cancel
                        </button>
                      )}
                      {item.status !== "AVAILABLE" && (
                        <span style={{ fontSize: "13px", color: "#64748b" }}>
                          Locked
                        </span>
                      )}
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

export default MyListings;