import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function Address() {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [message, setMessage] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [showForm, setShowForm] = useState(false); // New state for form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = "/address/addAddress";

      const response = await axiosInstance.post(endpoint, formData);

      setMessage(response.data.message);
      setFormData({
        street: "",
        city: "",
        state: "",
        zip: "",
      });

      // Refresh addresses list after adding
      fetchAddresses();

      // Hide form after successful submission
      setShowForm(false);

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding address";
      setMessage(errorMessage);
      console.error("Error adding address:", error);

      // Clear error message after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setFormData({
      street: "",
      city: "",
      state: "",
      zip: "",
    });
    setMessage("");
  };

  const fetchAddresses = async () => {
    try {
      setFetchingAddresses(true);
      const endpoint = "/address/showAddress";
      const response = await axiosInstance.get(endpoint);
      console.log("Addresses:", response.data);
      setAddresses(response.data.addresses || response.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setMessage("Error fetching addresses");
    } finally {
      setFetchingAddresses(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Add Address Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Addresses</h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Address</span>
            </button>
          )}
        </div>

        {/* Global Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error") || message.includes("error")
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-green-100 text-green-800 border border-green-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Add Address Form - Only show when showForm is true */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Address
              </h2>
              <button
                onClick={handleCancelForm}
                className="text-gray-500 hover:text-gray-700 transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street *
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter street address (min 5 characters)"
                  required
                  minLength={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter city"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter state"
                  required
                  minLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter ZIP code (min 5 characters)"
                  required
                  minLength={5}
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Save Address</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Addresses List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Saved Addresses
          </h3>

          {fetchingAddresses ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-3 text-gray-600">Loading addresses...</span>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No addresses saved yet</p>
              <p className="text-sm mb-4">
                Add your first address to get started
              </p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Your First Address
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addresses.map((address, index) => (
                <div
                  key={address._id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">
                      {address.street}
                    </p>
                    <p className="text-gray-600">
                      {address.city}, {address.state}
                    </p>
                    <p className="text-gray-600">ZIP: {address.zip}</p>
                    {address.isDefault && (
                      <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Address;
