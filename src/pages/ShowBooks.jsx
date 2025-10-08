import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { Star, DollarSign, Search, CircleChevronRight } from "lucide-react";

function ShowBooks() {
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
    <div className="min-h-screen flex pt-16">
      <aside className="w-80 h-[100vh] mt-4 bg-white p-6 shadow-xs border-r border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Filter Books</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option>
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Science</option>
              <option>History</option>
              <option>Biography</option>
              <option>Comics</option>
              <option>Fantasy</option>
              <option>Mystery</option>
              <option>Romance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <select className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option>
              <option>Under $10</option>
              <option>$10 - $20</option>
              <option>$20 - $50</option>
              <option>Above $50</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <select className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option>
              <option>New</option>
              <option>Used - Like New</option>
              <option>Used - Good</option>
              <option>Used - Acceptable</option>
            </select>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 font-medium">
            Search
          </button>

          <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300 font-medium">
            Clear Filters
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Discover Books
        </h1>

        <div className="flex flex-col gap-6">
          {books.length > 0 &&
            books.map((book) => (
              <div
                key={book._id}
                className="flex gap-8  bg-white p-4 rounded-sm shadow-sm "
              >
                <img
                  src={`http://localhost:5000/images/books/${book.coverImage}`}
                  alt={book.title}
                  className="w-50 h-60 object-cover rounded transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="240"><rect width="160" height="240" fill="%23f3f4f6"/><text x="80" y="120" text-anchor="middle" fill="%236b7280">No Image</text></svg>';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2 text-lg">by {book.author}</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className={
                            index < Math.floor(book.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({book.rating})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-2xl font-bold">
                        ₹{book.price}
                        <span className="text-gray-500 ml-2 text-base font-normal">
                          M.R.P
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {book.stock}
                      </p>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books available</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ShowBooks;
