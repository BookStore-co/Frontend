import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Package,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const endpoint = "/cart/showInCart";
        const response = await axiosInstance.get(endpoint);
        setCartItems(response.data?.Items || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.response?.data?.message || "Failed to load cart");

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  // Remove item from cart
  const handleRemove = async (bookId, bookTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to remove "${bookTitle}" from your cart?`
      )
    ) {
      return;
    }

    try {
      setUpdating(true);
      const endpoint = `/cart/removeFromKart/${bookId}`;
      const response = await axiosInstance.delete(endpoint);
      setCartItems(response.data?.cart?.Items || []);

      // Show success notification
      setNotification({
        type: "success",
        message: "Item removed from cart successfully",
      });

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setNotification({
        type: "error",
        message: "Failed to remove item from cart",
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setUpdating(false);
    }
  };

  // Update quantity
  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdating(true);
      const response = await axiosInstance.put("/cart/update-cart", {
        bookId,
        quantity: newQuantity,
      });

      setCartItems(response.data?.cart?.Items || []);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const book = item.BookId;
      if (book) {
        const discountedPrice = book.price * (1 - (book.discount || 0) / 100);
        return total + discountedPrice * item.quantity;
      }
      return total;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      const book = item.BookId;
      if (book?.discount > 0) {
        const discountAmount = (book.price * book.discount) / 100;
        return savings + discountAmount * item.quantity;
      }
      return savings;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Notification Component
  const NotificationComponent = () => {
    if (!notification) return null;

    return (
      <div
        className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 max-w-md ${
          notification.type === "success"
            ? "bg-green-100 border border-green-200 text-green-800"
            : "bg-red-100 border border-red-200 text-red-800"
        }`}
      >
        <div className="flex items-start space-x-3">
          {notification.type === "success" ? (
            <CheckCircle size={20} className="text-green-600 mt-0.5" />
          ) : (
            <AlertCircle size={20} className="text-red-600 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600 text-lg">Loading cart...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => navigate("/books")}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Browse Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-8">
      <NotificationComponent />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-indigo-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
            </div>
          </div>
          <div className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <button
              onClick={() => navigate("/books")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const book = item.BookId;
                if (!book) return null;

                const discountedPrice =
                  book.price * (1 - (book.discount || 0) / 100);

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow p-6 flex items-start space-x-4"
                  >
                    {/* Book Image */}
                    <img
                      src={
                        book.coverImage
                          ? `http://localhost:5000/images/books/${book.coverImage}`
                          : "/placeholder-book.jpg"
                      }
                      alt={book.title}
                      className="w-24 h-32 object-cover rounded-lg flex-shrink-0"
                    />

                    {/* Book Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 mb-2">by {book.author}</p>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {book.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{discountedPrice.toFixed(2)}
                        </span>
                        {book.discount > 0 && (
                          <>
                            <span className="text-lg text-gray-500 line-through">
                              ₹{book.price.toFixed(2)}
                            </span>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                              {book.discount}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-700 font-medium">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(book._id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || updating}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(book._id, item.quantity + 1)
                              }
                              disabled={updating || item.quantity >= book.stock}
                              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          {item.quantity >= book.stock && (
                            <span className="text-sm text-red-500">
                              Max stock reached
                            </span>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(book._id, book.title)}
                          disabled={updating}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        ₹{(discountedPrice * item.quantity).toFixed(2)}
                      </div>
                      {book.discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{(book.price * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">
                        -₹{savings.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => navigate("/books")}
                  className="w-full mt-3 bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Continue Shopping
                </button>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle size={16} />
                    <span className="text-sm font-medium">
                      Secure checkout guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
