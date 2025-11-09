import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage =
    location.pathname === "/" || location.pathname === "/home";
  const isDashboardPage = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (isLandingPage) {
        setShowNavbar(scrollTop > viewportHeight);
      } else if (!isDashboardPage) {
        setShowNavbar(true);
      }
    };

    if (isDashboardPage) {
      setShowNavbar(false);
    } else if (isLandingPage) {
      setShowNavbar(false);
      window.addEventListener("scroll", handleScroll);
    } else {
      setShowNavbar(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage, isDashboardPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.log("Token expired");
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        setUser({
          name: decoded.name || "User",
          id: decoded.id,
          role: decoded.role,
        });
      } catch (err) {
        console.log("Invalid token:", err);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Fixed cart item count function
  const fetchCartItemCount = async () => {
    if (!user) {
      setCartItemCount(0);
      return;
    }

    try {
      const endpoint = "/cart/showInCart";
      const response = await axiosInstance.get(endpoint);
      const items = response.data?.Items || [];
      setCartItemCount(items.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItemCount(0);
    }
  };

  // Fetch cart count when user changes or component mounts
  useEffect(() => {
    if (user) {
      fetchCartItemCount();
    } else {
      setCartItemCount(0);
    }
  }, [user]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      if (user) {
        fetchCartItemCount();
      }
    };

    // Custom event listener for cart updates
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [user]);

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setUser(null);
            return;
          }
          setUser({
            name: decoded.name || "User",
            id: decoded.id,
            role: decoded.role,
          });
        } catch (err) {
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, []);

  const handleAvatarClick = () => {
    navigate("/dashboard");
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  // Don't render navbar on dashboard pages
  if (isDashboardPage) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3 transition-all duration-500 ease-in-out ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            BOOKSHELF
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Books
            </Link>
            <Link
              to="/categories"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 rounded-full border-0 outline-none bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 w-64 transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Fixed Cart Button */}
            <button 
              onClick={handleCartClick}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300" 
              title={user ? "Go to Cart" : "Login to view cart"}
            >
              <svg
                className="w-6 h-6 text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
              {user && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {user ? (
              <div
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
                onClick={handleAvatarClick}
                title="Go to Dashboard"
              >
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200">
                  Hi, {user.name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 hidden sm:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2 rounded-full font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Sign In
                </button>
              </Link>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Books
            </Link>
            <Link
              to="/categories"
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Contact
            </Link>

            {/* Mobile Cart Link */}
            <button
              onClick={() => {
                handleCartClick();
                setOpen(false);
              }}
              className="flex items-center justify-between w-full text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              <span>Cart</span>
              {user && cartItemCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    handleAvatarClick();
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700 font-medium">
                      Hi, {user.name}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;