import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  MapPin,
  Package,
  Shield,
  Truck,
  RotateCcw,
  Award,
  Plus,
  Minus,
  Eye,
  Check,
  ChevronRight,
} from "lucide-react";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const endpoint = `/books/showBookById/${id}`;
        const response = await axiosInstance.get(endpoint);
        setBook(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError(
          error.response?.data?.message || "Error fetching book details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const endpoint = "/orders/addToCart";
      await axiosInstance.post(endpoint, {
        bookId: book._id,
        quantity: quantity,
      });
      alert("Book added to cart successfully!");
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("Failed to add book to cart.");
    }
  };

  const handleBuyNow = () => {
    console.log("Buy now:", book._id, "Quantity:", quantity);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const calculateDiscountedPrice = () => {
    if (book?.discount && book.discount > 0) {
      return (book.price * (1 - book.discount / 100)).toFixed(2);
    }
    return book?.price?.toFixed(2) || "0.00";
  };

  const calculateSavings = () => {
    if (book?.discount && book.discount > 0) {
      return (book.price * (book.discount / 100)).toFixed(2);
    }
    return "0.00";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-400 animate-ping"></div>
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-lg font-medium">
                Loading book details...
              </p>
              <p className="text-gray-400 text-sm">Please wait a moment</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-red-200 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-red-500 text-base mb-6">{error}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg"
              >
                Go Back
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Book Not Found
            </h2>
            <p className="text-gray-600 text-base mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
            >
              Return to Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6 bg-white rounded-lg px-4 py-2 shadow-sm">
          <button
            onClick={() => navigate("/")}
            className="hover:text-indigo-600 transition-colors font-medium"
          >
            Home
          </button>
          <ChevronRight size={14} className="text-gray-400" />
          <button
            onClick={() => navigate("/books")}
            className="hover:text-indigo-600 transition-colors font-medium"
          >
            Books
          </button>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900 font-medium">{book?.category}</span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-600 truncate max-w-xs">{book?.title}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-indigo-600 transition-all duration-200 mb-6 bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md group"
        >
          <ArrowLeft
            size={18}
            className="mr-2 transition-transform group-hover:-translate-x-1"
          />
          <span className="font-medium text-sm">Back to Books</span>
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
              {book?.coverImage ? (
                <img
                  src={`http://localhost:5000/images/books/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-full h-[500px] bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center"
                style={{ display: book?.coverImage ? "none" : "flex" }}
              >
                <div className="text-center text-white">
                  <Package size={60} className="mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-bold mb-1">No Cover Image</p>
                  <p className="text-sm opacity-80">Preview not available</p>
                </div>
              </div>

              {/* Discount Badge */}
              {book?.discount > 0 && (
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <span className="text-sm">{book.discount}%</span> OFF
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm ${
                  isWishlisted
                    ? "bg-red-500 text-white scale-110"
                    : "bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white"
                }`}
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </button>

              {/* Stock Badge */}
              <div className="absolute bottom-4 left-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                    book?.stock > 10
                      ? "bg-green-500/90 text-white"
                      : book?.stock > 0
                      ? "bg-yellow-500/90 text-white"
                      : "bg-red-500/90 text-white"
                  }`}
                >
                  <Package size={14} className="inline mr-1" />
                  {book?.stock > 0 ? `${book.stock} Available` : "Out of Stock"}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title & Author Section */}
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {book?.title}
                </h1>
                <p className="text-lg text-gray-600 mb-3">
                  by{" "}
                  <span className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer">
                    {book?.author}
                  </span>
                </p>
              </div>

              {/* Category & Rating */}
              <div className="flex items-center space-x-3">
                <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                  📚 {book?.category}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(book?.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {book?.rating}/5
                  </span>
                  <span className="text-gray-500 font-medium text-sm">
                    ({book?.sold || 0} sold)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-green-600">
                    ₹{calculateDiscountedPrice()}
                  </span>
                  {book?.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{book.price?.toFixed(2)}
                      </span>
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                        Save ₹{calculateSavings()}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1 text-green-600">
                    <Check size={12} />
                    <span className="font-medium">Inclusive of all taxes</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <Truck size={12} />
                    <span className="font-medium">Free delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            {book?.stock > 0 && (
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-gray-700 text-sm">
                    Quantity:
                  </span>
                  <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-x-2 border-gray-300 min-w-[60px] text-center font-semibold text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(book.stock, quantity + 1))
                      }
                      className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      disabled={quantity >= book.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ShoppingCart size={20} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {/* Seller Information */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-3">
                  <MapPin size={20} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">
                    {book.seller?.SellerDetails?.shopName || "Unknown Seller"}
                  </h3>
                  <p className="text-gray-600 mb-3 text-xs">
                    Seller ID: {book.seller?._id}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Award size={14} className="text-green-500" />
                      <span className="text-green-600 font-medium text-xs">
                        Verified Seller
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star
                        size={14}
                        className="text-yellow-400 fill-current"
                      />
                      <span className="font-medium text-xs">4.5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  icon: Truck,
                  title: "Free Delivery",
                  desc: "On orders above ₹500",
                  color: "green",
                },
                {
                  icon: RotateCcw,
                  title: "Easy Returns",
                  desc: "7 days return policy",
                  color: "blue",
                },
                {
                  icon: Shield,
                  title: "Secure Payment",
                  desc: "100% safe & secure",
                  color: "purple",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                >
                  <feature.icon
                    size={20}
                    className={`text-${feature.color}-500`}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-xs">
                      {feature.title}
                    </p>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Share Button */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors bg-white rounded-lg p-3 shadow-sm hover:shadow-md">
              <Share2 size={18} />
              <span className="font-medium text-sm">Share this book</span>
            </button>
          </div>
        </div>

        {/* Description Section */}
        {book.description && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Product Description
            </h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-sm">
                {book.description}
              </p>
            </div>
          </div>
        )}

        {/* Product Specifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Product Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {[
                { label: "Title", value: book.title },
                { label: "Author", value: book.author },
                { label: "Category", value: book.category },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="font-medium text-gray-600 text-sm">
                    {spec.label}:
                  </span>
                  <span className="text-gray-900 font-medium text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { label: "Price", value: `₹${book.price}` },
                { label: "Stock", value: `${book.stock} units` },
                { label: "Rating", value: `${book.rating}/5` },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="font-medium text-gray-600 text-sm">
                    {spec.label}:
                  </span>
                  <span className="text-gray-900 font-medium text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
