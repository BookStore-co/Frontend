import {
  User,
  Store,
  Shield,
  SquarePen,
  Mail,
  Phone,
  ShieldUser,
  CalendarFold,
  MapPin,
  FileDigit,
  FileText,
  IdCard,
  Landmark,
  Trash2,
  Camera, // Add this import for camera icon
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ icno: Icon, label, value }) => (
  <div className="w-full sm:w-[calc(50%-20px)]">
    <p className="flex items-center gap-2">
      <Icon size={18} />
      {label}
    </p>
    <div className="bg-gray-50 p-3 mt-2 rounded-md w-full">
      {value || "N/A"}
    </div>
  </div>
);

function Profile() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Add this state for preview
  const [imagePreview, setImagePreview] = useState(null); // Add this state for preview URL

  // Update the profileAction array to be dynamic based on seller status
  const profileAction = [
    { Icon: User, title: "Personal Info" },
    { Icon: Store, title: "Seller Details" },
    {
      Icon: Shield,
      title: seller?.status === "approved" ? "Account Status" : "Registration",
    },
  ];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/admin/getSellerById/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSeller(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching seller:", error);
        setError("Failed to fetch seller data");
      } finally {
        setLoading(false);
      }
    };

    if (!token) {
      navigate("/login");
      return;
    }

    if (sellerId) {
      fetchSeller();
    }
  }, [sellerId, token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No seller data found</p>
      </div>
    );
  }

  const personalFields = [
    { Icon: User, label: "Full Name", value: seller.name },
    { Icon: Mail, label: "Email", value: seller.email },
    { Icon: Phone, label: "Phone", value: seller.mobno },
    { Icon: ShieldUser, label: "Account Type", value: seller.role },
    {
      Icon: CalendarFold,
      label: "Member Since",
      value: seller.date
        ? new Date(seller.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "N/A",
    },
  ];

  const sellerFields = [
    { Icon: Store, label: "Shop Name", value: seller.SellerDetails?.shopName },
    {
      Icon: MapPin,
      label: "Shop Address",
      value: seller.SellerDetails?.shopAddress,
    },
    {
      Icon: FileDigit,
      label: "GST Number",
      value: seller.SellerDetails?.gstNumber,
    },
    {
      Icon: FileText,
      label: "PAN Number",
      value: seller.SellerDetails?.panNumber,
    },
    {
      Icon: IdCard,
      label: "Aadhar Number",
      value: seller.SellerDetails?.aadharNumber,
    },
    {
      Icon: Landmark,
      label: "Bank Name",
      value: seller.SellerDetails?.bankDetails?.bankName,
    },
    {
      Icon: FileDigit,
      label: "Account Number",
      value: seller.SellerDetails?.bankDetails?.accountNumber,
    },
    {
      Icon: IdCard,
      label: "IFSC Code",
      value: seller.SellerDetails?.bankDetails?.ifscCode,
    },
    {
      Icon: IdCard,
      label: "Account Holder Name",
      value: seller.SellerDetails?.bankDetails?.accountHolderName,
    },
  ];

  const currentFields =
    activeTab === "Personal Info" ? personalFields : sellerFields;

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/approvePendingRequest/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update seller status locally
      setSeller((prev) => ({ ...prev, status: "approved" }));
      alert("Seller approved successfully!");
    } catch (error) {
      console.error("Error approving seller:", error);
      alert(
        "Failed to approve seller: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/rejectPendingRequest/${sellerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update seller status locally
      setSeller((prev) => ({ ...prev, status: "rejected" }));
      alert("Seller rejected successfully!");
    } catch (error) {
      console.error("Error rejecting seller:", error);
      alert(
        "Failed to reject seller: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Add delete function
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this seller? This action cannot be undone."
      )
    ) {
      try {
        await axios.delete(
          `http://localhost:5000/api/admin/deleteSeller/${sellerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Seller deleted successfully!");
        navigate("/dashboard"); // Redirect to sellers list
      } catch (error) {
        console.error("Error deleting seller:", error);
        alert(
          "Failed to delete seller: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  // Updated image upload handler with preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      console.log("Selected file:", file);
    }
  };

  // Handle upload confirmation
  const handleUploadConfirm = async () => {
    if (selectedImage) {
      // Here you can implement actual upload logic
      console.log("Uploading:", selectedImage);
      alert("Image upload functionality will be implemented");

      // Clean up
      setShowImageUpload(false);
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  // Handle modal close - clean up preview
  const handleModalClose = () => {
    setShowImageUpload(false);
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up memory
      setImagePreview(null);
    }
  };

  // Add click handler for profile image
  const handleProfileImageClick = () => {
    setShowImageUpload(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-8 pb-10">
      <div className="flex justify-center items-start">
        <div className="w-full max-w-5xl mt-10 bg-white p-5 rounded-xl flex flex-col sm:flex-row gap-5">
          {/* Updated profile image section */}
          <div className="relative group">
            <div
              className="bg-zinc-100 rounded-full w-32 h-32 overflow-hidden mx-auto sm:mx-0 cursor-pointer transition-all duration-300 hover:opacity-80"
              onClick={handleProfileImageClick}
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1739054760977-f9e246e4c1be?q=80&w=1074&auto=format&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Camera overlay on hover */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer w-32 h-32 mx-auto sm:mx-0"
              onClick={handleProfileImageClick}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold mt-4">{seller.name}</h1>
            <p className="text-gray-600 text-lg capitalize">{seller.role}</p>
            <p className="text-gray-500 text-sm">
              Member Since{" "}
              {seller.date
                ? new Date(seller.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          <div className="flex justify-center sm:justify-start sm:items-start mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                seller.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : seller.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {seller.status
                ? seller.status.charAt(0).toUpperCase() + seller.status.slice(1)
                : "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Upload Profile Image</h3>

            {/* Image Preview Section */}
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                  />
                </div>
              </div>
            )}

            {/* File Input */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>

              {!selectedImage ? (
                <button
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Camera size={16} />
                  Choose Image
                </button>
              ) : (
                <button
                  onClick={handleUploadConfirm}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                >
                  <Camera size={16} />
                  Upload Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-10 ">
        <div className="w-full max-w-5xl p-4 rounded-md">
          <div className="flex gap-8 overflow-x-auto pb-2">
            {profileAction.map((action, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(action.title)}
                className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === action.title
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <action.Icon className="w-5 h-5" />
                <span className="font-medium">{action.title}</span>
              </button>
            ))}
          </div>
          <hr className="mt-2 border-gray-200" />
        </div>
      </div>

      <div className="flex justify-center items-center mt-5 mb-10">
        {(activeTab === "Personal Info" || activeTab === "Seller Details") && (
          <div className="w-full max-w-5xl p-6 sm:p-10 bg-white rounded-xl min-h-[400px]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                {activeTab === "Personal Info"
                  ? "Personal Information"
                  : "Seller Information"}
              </h1>
            </div>
            <div className="flex gap-6 sm:gap-10 flex-wrap">
              {currentFields.map((item, index) => (
                <InfoCard
                  key={index}
                  icno={item.Icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>

            {activeTab === "Seller Details" && (
              <div className="w-full mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <IdCard size={18} />
                  Aadhar Documents
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Front Image */}
                  {seller.SellerDetails?.aadharFrontImage ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2 text-gray-700">
                        Aadhar Front
                      </h4>
                      <img
                        src={`http://localhost:5000/images/sellerAadhar/${seller.SellerDetails.aadharFrontImage}`}
                        alt="Aadhar Front"
                        className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/images/sellerAadhar/${seller.SellerDetails.aadharFrontImage}`,
                            "_blank"
                          )
                        }
                        onError={(e) => {
                          console.log(
                            "Front image failed to load:",
                            e.target.src
                          );
                          e.target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><text x="10" y="50">Front image not found</text></svg>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                      <h4 className="text-sm font-medium mb-2">Aadhar Front</h4>
                      <p>No front image available</p>
                    </div>
                  )}

                  {/* Back Image */}
                  {seller.SellerDetails?.aadharBackImage ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2 text-gray-700">
                        Aadhar Back
                      </h4>
                      <img
                        src={`http://localhost:5000/images/sellerAadhar/${seller.SellerDetails.aadharBackImage}`}
                        alt="Aadhar Back"
                        className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/images/sellerAadhar/${seller.SellerDetails.aadharBackImage}`,
                            "_blank"
                          )
                        }
                        onError={(e) => {
                          console.log(
                            "Back image failed to load:",
                            e.target.src
                          );
                          e.target.src =
                            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><text x="10" y="50">Back image not found</text></svg>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                      <h4 className="text-sm font-medium mb-2">Aadhar Back</h4>
                      <p>No back image available  </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Registration" && seller?.status !== "approved" && (
          <div className="w-full max-w-5xl p-6 sm:p-10 bg-white rounded-md min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Admin Actions
              </h1>
            </div>
            <div className="space-y-6">
              <div className="border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-green-700">
                    Approve Seller
                  </h3>
                  <p className="text-gray-600">
                    Approve this seller account to start selling
                  </p>
                </div>
                <button
                  onClick={handleApprove}
                  disabled={seller?.status === "approved"}
                  className={`px-4 py-2 rounded-md w-full sm:w-auto transition-colors ${
                    seller?.status === "approved"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {seller?.status === "approved"
                    ? "Already Approved"
                    : "Approve"}
                </button>
              </div>
              <div className="border border-red-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-red-700">
                    Reject Seller
                  </h3>
                  <p className="text-gray-600">
                    Reject this seller application
                  </p>
                </div>
                <button
                  onClick={handleReject}
                  disabled={seller?.status === "rejected"}
                  className={`px-4 py-2 rounded-md w-full sm:w-auto transition-colors ${
                    seller?.status === "rejected"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {seller?.status === "rejected"
                    ? "Already Rejected"
                    : "Reject"}
                </button>
              </div>

              {/* Add Delete Button to Registration Tab */}
              <div className="border border-red-300 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-red-50">
                <div>
                  <h3 className="text-lg font-medium text-red-800">
                    Delete Seller Account
                  </h3>
                  <p className="text-red-600">
                    Permanently delete this seller account and all associated
                    data
                  </p>
                </div>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md w-full sm:w-auto transition-colors bg-red-700 text-white hover:bg-red-800 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "Account Status" ||
          (activeTab === "Registration" && seller?.status === "approved")) && (
          <div className="w-full max-w-5xl p-6 sm:p-10 bg-white rounded-md min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Account Status
              </h1>
            </div>
            <div className="space-y-6">
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      Account Approved
                    </h3>
                    <p className="text-green-600">
                      This seller account has been approved and is active
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Account Status
                    </h4>
                    <span className="inline-flex px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      ✓ Approved
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Approval Date
                    </h4>
                    <p className="text-gray-600">
                      {seller?.approvedAt
                        ? new Date(seller.approvedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Recently Approved"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Selling Permissions
                    </h4>
                    <p className="text-green-600 font-medium">✓ Enabled</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Account Type
                    </h4>
                    <p className="text-gray-600 capitalize">
                      {seller?.role || "Seller"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Delete Button to Account Status Tab */}
              <div className="border border-red-300 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-red-50">
                <div>
                  <h3 className="text-lg font-medium text-red-800">
                    Delete Seller Account
                  </h3>
                  <p className="text-red-600">
                    Permanently delete this seller account and all associated
                    data
                  </p>
                </div>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md w-full sm:w-auto transition-colors bg-red-700 text-white hover:bg-red-800 flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
