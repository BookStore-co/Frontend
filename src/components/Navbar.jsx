import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added: Import useLocation
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ Added: Get current location

  // ✅ Updated: Check if user is on landing page
  const isLandingPage =
    location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // ✅ Updated: Only apply scroll logic on landing page
      if (isLandingPage) {
        setShowNavbar(scrollTop > viewportHeight);
      } else {
        setShowNavbar(true); // Always show on other pages
      }
    };

    // ✅ Updated: Set initial navbar visibility based on page
    if (isLandingPage) {
      setShowNavbar(false); // Hidden initially on landing page
      window.addEventListener("scroll", handleScroll);
    } else {
      setShowNavbar(true); // Always visible on other pages
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLandingPage]); // ✅ Added: Dependency on isLandingPage

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.log("Token expired");
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        // Set user data from token
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

  // Listen for auth state changes
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

  // ✅ Added: Handle avatar click to navigate to dashboard
  const handleAvatarClick = () => {
    navigate("/dashboard");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-3 transition-all duration-500 ease-in-out ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">BOOKSHELF</h1>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Books
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
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

            {/* Cart */}
            <button className="relative p-2">
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
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* ✅ Updated: Clickable Profile section */}
            {user ? (
              <div
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
                onClick={handleAvatarClick} // ✅ Added: Click handler
                title="Go to Dashboard" // ✅ Added: Tooltip
              >
                {/* Profile Avatar */}
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-gray-700 font-medium hover:text-indigo-600 transition-colors duration-200">
                  Hi, {user.name}
                </span>
                {/* ✅ Added: Dashboard icon indicator */}
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
              <a href="/login">
                <button className="px-6 py-2 rounded-full font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Sign In
                </button>
              </a>
            )}

            {/* Mobile menu button */}
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

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#"
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Books
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Categories
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-indigo-600 py-2 font-medium transition-colors"
            >
              Contact
            </a>

            {/* ✅ Updated: Mobile profile section with dashboard navigation */}
            <div className="pt-4 border-t border-gray-100">
              {user ? (
                <div
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    handleAvatarClick();
                    setOpen(false); // Close mobile menu
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
                <a href="/login" onClick={() => setOpen(false)}>
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300">
                    Sign In
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
