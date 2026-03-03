import React from "react";

const MyListings = () => {
  // Dummy Data
  const listings = [
    {
      id: 1,
      image: "https://apollo.olx.in/v1/files/dgq5nqc8sr4r2-IN/image",
      name: "iPhone 12 Pro",
      category: "Smartphone",
      date: "2026-02-20",
      status: "Completed",
      value: "$85"
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOG3hn7TyTGF9fuMMGSx07-KjeLxml89R-Q&s",
      name: "MacBook Air 2020",
      category: "Laptop",
      date: "2026-02-18",
      status: "Processing",
      value: "$120"
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOG3hn7TyTGF9fuMMGSx07-KjeLxml89R-Q&s",
      name: "iPad Pro 2021",
      category: "Tablet",
      date: "2026-02-15",
      status: "Pending",
      value: "$70"
    }
  ];

  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">My Listings</h1>
        <p className="page-subtitle">
          Track all devices you have uploaded for recycling
        </p>
      </div>

      {/* Listings Count */}
      <div style={{ marginBottom: "20px", fontWeight: 500 }}>
        Total Listings: {listings.length}
      </div>

      {/* Table Container */}
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
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px"
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>
                  <td>
                    <span
                      className={`status-badge ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.value}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      style={{ marginRight: "8px" }}
                    >
                      View
                    </button>

                    {item.status === "Pending" && (
                      <button className="btn btn-danger">
                        Cancel
                      </button>
                    )}
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

export default MyListings;