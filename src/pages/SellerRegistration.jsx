import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Keep all your existing form components (PersonalInfoForm, ShopDetailsForm, DocumentsForm, BankDetailsForm) unchanged...

function PersonalInfoForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600 mt-2">Tell us about yourself</p>
      </div>

      <div className="space-y-5">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 ${
              errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 ${
              errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 ${
              errors.password ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            name="mobno"
            value={formData.mobno}
            onChange={handleChange}
            placeholder="Mobile Number"
            maxLength="10"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 ${
              errors.mobno ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.mobno && (
            <p className="text-red-500 text-sm mt-1">{errors.mobno}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ShopDetailsForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Shop Details</h2>
        <p className="text-gray-600 mt-2">Information about your business</p>
      </div>

      <div className="space-y-5">
        <div>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-gray-300 transition-all duration-300 ${
              errors.shopName ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.shopName && (
            <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
          )}
        </div>

        <div>
          <textarea
            name="shopAddress"
            value={formData.shopAddress}
            onChange={handleChange}
            placeholder="Shop Address"
            rows="3"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-gray-300 transition-all duration-300 resize-none ${
              errors.shopAddress
                ? "border-red-400 bg-red-50"
                : "border-gray-200"
            }`}
          />
          {errors.shopAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.shopAddress}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="GST Number (Optional)"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-gray-300 transition-all duration-300"
          />
          {errors.gstNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.gstNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            placeholder="Aadhar Number"
            maxLength="12"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-gray-300 transition-all duration-300 ${
              errors.aadharNumber ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            placeholder="PAN Number"
            maxLength="10"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-gray-300 transition-all duration-300 ${
              errors.panNumber ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.panNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function DocumentsForm({ formData, handleFileChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <p className="text-gray-600 mt-2">Upload your identity documents</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card Front Image *
          </label>
          <input
            type="file"
            name="aadharFrontImage"
            onChange={handleFileChange}
            accept="image/*"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 hover:border-gray-300 transition-all duration-300 ${
              errors.aadharFrontImage ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.aadharFrontImage && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharFrontImage}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Card Back Image *
          </label>
          <input
            type="file"
            name="aadharBackImage"
            onChange={handleFileChange}
            accept="image/*"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 hover:border-gray-300 transition-all duration-300 ${
              errors.aadharBackImage ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.aadharBackImage && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharBackImage}</p>
          )}
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-orange-800">
            <p className="font-medium">Document Upload Requirements</p>
            <ul className="mt-1 list-disc list-inside">
              <li>Upload clear, readable images</li>
              <li>File size should be less than 5MB</li>
              <li>Supported formats: JPG, PNG, PDF</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BankDetailsForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Bank Details</h2>
        <p className="text-gray-600 mt-2">Secure payment information</p>
      </div>

      <div className="space-y-5">
        <div>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-gray-300 transition-all duration-300 ${
              errors.accountNumber
                ? "border-red-400 bg-red-50"
                : "border-gray-200"
            }`}
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="IFSC Code"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-gray-300 transition-all duration-300 ${
              errors.ifscCode ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.ifscCode && (
            <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-gray-300 transition-all duration-300 ${
              errors.bankName ? "border-red-400 bg-red-50" : "border-gray-200"
            }`}
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="Account Holder Name"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 hover:border-gray-300 transition-all duration-300 ${
              errors.accountHolderName
                ? "border-red-400 bg-red-50"
                : "border-gray-200"
            }`}
          />
          {errors.accountHolderName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.accountHolderName}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium">Security Notice</p>
            <p className="mt-1">
              Your banking information is encrypted and securely stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS = {
  PERSONAL_INFO: 1,
  SHOP_DETAILS: 2,
  DOCUMENTS: 3,
  BANK_DETAILS: 4,
};

function SellerRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(STEPS.PERSONAL_INFO);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    password: "",
    mobno: "",

    // Shop Details
    shopName: "",
    shopAddress: "",
    gstNumber: "",
    aadharNumber: "",
    panNumber: "",

    // Bank Details
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    accountHolderName: "",
  });

  const [files, setFiles] = useState({
    aadharFrontImage: null,
    aadharBackImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: selectedFiles[0],
    }));

    // Clear error when user selects file
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case STEPS.PERSONAL_INFO:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6)
          newErrors.password = "Password must be at least 6 characters";
        if (!formData.mobno.trim())
          newErrors.mobno = "Mobile number is required";
        if (!/^\d{10}$/.test(formData.mobno))
          newErrors.mobno = "Mobile number must be 10 digits";
        break;

      case STEPS.SHOP_DETAILS:
        if (!formData.shopName.trim())
          newErrors.shopName = "Shop name is required";
        if (!formData.shopAddress.trim())
          newErrors.shopAddress = "Shop address is required";
        if (!formData.aadharNumber.trim())
          newErrors.aadharNumber = "Aadhar number is required";
        if (!/^\d{12}$/.test(formData.aadharNumber))
          newErrors.aadharNumber = "Aadhar number must be 12 digits";
        if (!formData.panNumber.trim())
          newErrors.panNumber = "PAN number is required";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber))
          newErrors.panNumber = "Invalid PAN number format";
        if (
          formData.gstNumber &&
          !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            formData.gstNumber
          )
        ) {
          newErrors.gstNumber = "Invalid GST number format";
        }
        break;

      case STEPS.DOCUMENTS:
        if (!files.aadharFrontImage)
          newErrors.aadharFrontImage = "Aadhar front image is required";
        if (!files.aadharBackImage)
          newErrors.aadharBackImage = "Aadhar back image is required";
        break;

      case STEPS.BANK_DETAILS:
        if (!formData.accountNumber.trim())
          newErrors.accountNumber = "Account number is required";
        if (!formData.ifscCode.trim())
          newErrors.ifscCode = "IFSC code is required";
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode))
          newErrors.ifscCode = "Invalid IFSC code format";
        if (!formData.bankName.trim())
          newErrors.bankName = "Bank name is required";
        if (!formData.accountHolderName.trim())
          newErrors.accountHolderName = "Account holder name is required";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Add basic user data
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("mobno", parseInt(formData.mobno));
      formDataToSend.append("role", "seller");

      // Add seller details as individual fields (NOT as JSON string)
      formDataToSend.append("SellerDetails[shopName]", formData.shopName);
      formDataToSend.append("SellerDetails[shopAddress]", formData.shopAddress);
      formDataToSend.append("SellerDetails[gstNumber]", formData.gstNumber || "");
      formDataToSend.append("SellerDetails[aadharNumber]", formData.aadharNumber);
      formDataToSend.append("SellerDetails[panNumber]", formData.panNumber);
      
      // Add bank details
      formDataToSend.append("SellerDetails[bankDetails][accountNumber]", formData.accountNumber);
      formDataToSend.append("SellerDetails[bankDetails][ifscCode]", formData.ifscCode);
      formDataToSend.append("SellerDetails[bankDetails][bankName]", formData.bankName);
      formDataToSend.append("SellerDetails[bankDetails][accountHolderName]", formData.accountHolderName);

      // Add files
      if (files.aadharFrontImage) {
        formDataToSend.append("aadharFrontImage", files.aadharFrontImage);
      }
      if (files.aadharBackImage) {
        formDataToSend.append("aadharBackImage", files.aadharBackImage);
      }

      console.log("Submitting registration data...");

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formDataToSend,
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log("Registration response:", response.data);

      setMessage({
        type: "success",
        text: response.data.message || "Registration successful! Pending admin approval.",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      console.error("Registration error:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        const errorData = error.response.data;

        // Handle MongoDB duplicate key errors
        if (errorData.message && errorData.message.includes("E11000")) {
          if (errorData.message.includes("email")) {
            errorMessage =
              "This email address is already registered. Please use a different email.";
            setErrors((prev) => ({ ...prev, email: "Email already exists" }));
            setCurrentStep(STEPS.PERSONAL_INFO);
          } else if (errorData.message.includes("mobno")) {
            errorMessage =
              "This mobile number is already registered. Please use a different number.";
            setErrors((prev) => ({
              ...prev,
              mobno: "Mobile number already exists",
            }));
            setCurrentStep(STEPS.PERSONAL_INFO);
          } else {
            errorMessage =
              "This information is already registered. Please check your details.";
          }
        } else {
          errorMessage =
            errorData.message || `Server error: ${error.response.status}`;
        }
      } else if (
        error.code === "ECONNREFUSED" ||
        error.code === "ERR_NETWORK"
      ) {
        errorMessage =
          "Unable to connect to server. Please make sure the backend is running.";
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentForm = () => {
    switch (currentStep) {
      case STEPS.PERSONAL_INFO:
        return (
          <PersonalInfoForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case STEPS.SHOP_DETAILS:
        return (
          <ShopDetailsForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case STEPS.DOCUMENTS:
        return (
          <DocumentsForm
            formData={formData}
            handleFileChange={handleFileChange}
            errors={errors}
          />
        );
      case STEPS.BANK_DETAILS:
        return (
          <BankDetailsForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep !== STEPS.BANK_DETAILS) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepTitles = {
    [STEPS.PERSONAL_INFO]: "Personal Info",
    [STEPS.SHOP_DETAILS]: "Shop Details",
    [STEPS.DOCUMENTS]: "Documents",
    [STEPS.BANK_DETAILS]: "Bank Details",
  };

  const isLastStep = currentStep === STEPS.BANK_DETAILS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Become a Seller
            </h1>
            <p className="text-lg text-gray-600">
              Join our marketplace and start selling your books
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {Object.entries(stepTitles).map(([step, title], index) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300 ${
                          currentStep >= parseInt(step)
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`ml-3 text-sm font-medium hidden sm:block transition-colors duration-300 ${
                          currentStep >= parseInt(step)
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      >
                        {title}
                      </span>
                    </div>
                    {index < Object.keys(stepTitles).length - 1 && (
                      <div
                        className={`w-16 h-1 rounded-full transition-all duration-500 ${
                          currentStep > parseInt(step)
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12">
              {renderCurrentForm()}

              {/* Message Display */}
              {message && (
                <div
                  className={`mt-8 p-5 rounded-2xl transition-all duration-300 ${
                    message.type === "success"
                      ? "bg-green-50 border-2 border-green-200 text-green-800"
                      : "bg-red-50 border-2 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {message.type === "success" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      )}
                    </svg>
                    <span className="font-semibold text-base">{message.text}</span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-gray-100">
                <button
                  onClick={handlePrevious}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? "invisible"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400 transform hover:scale-105"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`px-10 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed shadow-none"
                      : isLastStep
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Submitting...
                    </div>
                  ) : isLastStep ? (
                    "Submit Application"
                  ) : (
                    "Next Step"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-lg">
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 font-semibold ml-2 transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerRegistration;