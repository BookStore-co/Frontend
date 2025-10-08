import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
function ListCard({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // const response = await axios.get(
        //   type === "Users"
        //     ? "http://localhost:5000/api/admin/getUsers"
        //     : type === "Sellers"
        //     ? "http://localhost:5000/api/admin/getSellers"
        //     : "http://localhost:5000/api/admin/getPendingSellers",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const endpoint = 
          type === "Users"
            ? "/admin/getUsers"
            : type === "Sellers"
            ? "/admin/getSellers"
            : "/admin/getPendingSellers";

        const response = await axiosInstance.get(endpoint);
        console.log(`${type} data:`, response.data);

        setItems(response.data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        setError(error.response?.data?.message || `Failed to fetch ${type}`);

        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else if (error.response && error.response.status === 403) {
          navigate("/not-authorized");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, type]);

  const handleApprove = async (sellerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/approvePendingRequest/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(
        items.map((item) =>
          item._id === sellerId ? { ...item, status: "approved" } : item
        )
      );

      alert(response.data.message || "Seller approved successfully!");
    } catch (error) {
      console.error("Error approving seller:", error);
      alert(error.response?.data?.message || "Failed to approve seller");
    }
  };

  const handleReject = async (sellerId) => {
    if (!window.confirm("Are you sure you want to reject this seller?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/admin/rejectPendingRequest/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(
        items.map((item) =>
          item._id === sellerId ? { ...item, status: "rejected" } : item
        )
      );

      alert(response.data.message || "Seller rejected successfully!");
    } catch (error) {
      console.error("Error rejecting seller:", error);
      alert(error.response?.data?.message || "Failed to reject seller");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600">Loading {type}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No {type} found</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Email: {item.email}</p>
            <p className="text-gray-600">
              Phone: {item.phone || item.mobno || "Not provided"}
            </p>
            <p className="text-gray-600">Role: {item.role || "user"}</p>

            {type === "Registration" && (
              <div className="mt-2 mb-3">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : item.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Status: {item.status || "pending"}
                </span>
              </div>
            )}

            {(type === "Sellers" || type === "Registration") &&
              item.SellerDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Shop:</span>{" "}
                    {item.SellerDetails.shopName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {item.SellerDetails.shopAddress || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">GST:</span>{" "}
                    {item.SellerDetails.gstNumber || "N/A"}
                  </p>
                </div>
              )}

            {item.createdAt && (
              <p className="text-gray-600 text-sm mt-2">
                Joined: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            )}

            <div className="mt-4 space-y-2">
              <button
                onClick={() => navigate(`/profile/${item._id}`)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Profile
              </button>

              {type === "Registration" && item.status === "pending" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}

              {type === "Registration" && item.status !== "pending" && (
                <div className="text-center py-2">
                  <span
                    className={`text-sm font-medium ${
                      item.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status === "approved"
                      ? "✓ Already Approved"
                      : "✗ Already Rejected"}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCard;
