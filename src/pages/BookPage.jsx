import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { Star, DollarSign, Search, CircleChevronRight } from "lucide-react";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const endpoint = "/books/showBooks";
        const response = await axiosInstance.get(endpoint);
        setBooks(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.response?.data?.message || "Failed to fetch books");

        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else if (error.response && error.response.status === 403) {
          navigate("/not-authorized");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          📚 Available Books
        </h1>
        <div className="flex items-center gap-3 mb-10 max-w-md mx-auto mb-15">
          <input
            type="text"
            placeholder="Search Book"
            className="flex-1 h-12  rounded-full pl-4 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="p-3 rounded-full w-12 h-12 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center shadow-lg">
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-10 cursor-pointer">
          <p className="border border-gray-300 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
            Fiction
          </p>
          <p className="border border-gray-300 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
            Story
          </p>
          <p className="border border-gray-300 px-4 py-2 rounded-lg font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
            Comics
          </p>
          <CircleChevronRight
            className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            size={20}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform  hover:scale-100"
            >
              {/* Book Image */}
              <div className="overflow-hidden rounded-t-2xl h-50">
                <img
                  src={`http://localhost:5000/images/books/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-50 object-cover  transition-transform duration-300"
                />
              </div>

              {/* Book Details */}
              <div className="p-5 space-y-2">
                <h2 className="text-lg font-bold text-gray-900">
                  {book.title}
                </h2>
                <p className="text-gray-700 text-sm">By {book.author}</p>
                <p className="text-gray-500 text-sm">
                  Shop: {book.seller?.SellerDetails?.shopName || "N/A"}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={18} className="fill-yellow-400" />
                    <span className="font-medium text-sm">{book.rating}</span>
                  </div>

                  <div className="flex items-center gap-1 font-semibold text-green-600">
                    <DollarSign size={16} />
                    <span>{book.price}</span>
                  </div>
                </div>

                <button className="w-full py-2 mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform shadow-md hover:shadow-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookPage;
