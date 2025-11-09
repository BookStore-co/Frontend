import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { BookOpen, Edit, Trash2, Eye } from "lucide-react";
import { jwtDecode } from "jwt-decode";

function BookTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user info from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        let endpoint = "/books/showBooks";
        
        // If user is seller, fetch only their books
        if (user && user.role === "seller") {
          endpoint = `/books/showBooksBySeller/${user.id}`;
        }

        const response = await axiosInstance.get(endpoint);

        console.log("Books data:", response.data);
        setBooks(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.response?.data?.message || "Failed to fetch books");

        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch books after user info is loaded
    if (user) {
      fetchBooks();
    }
  }, [navigate, user]);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/books/deleteBook/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-2 text-gray-600">Loading books...</span>
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

  if (!books || books.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {user?.role === "seller" ? "No Books Added Yet" : "No Books Found"}
        </h3>
        <p className="text-gray-500">
          {user?.role === "seller" 
            ? "You haven't added any books yet. Start by adding your first book!" 
            : "No books are available at the moment."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {user?.role === "seller" ? "My Books: " : "Total: "}{books.length} books
          </p>
          {user?.role === "seller" && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Seller Dashboard
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              {user?.role !== "seller" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50">
                {/* Book Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      {book.coverImage ? (
                        <img
                          src={`http://localhost:5000/images/books/${book.coverImage}`}
                          alt={book.title}
                          className="h-12 w-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
                        style={{display: book.coverImage ? 'none' : 'flex'}}
                      >
                        <BookOpen size={20} className="text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {book.title || "Untitled"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Added: {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : "Unknown"}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Author */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {book.author || "Unknown Author"}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {book.category || "Uncategorized"}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₹{book.price ? Number(book.price).toFixed(2) : "0.00"}
                  </div>
                  {book.discount && book.discount > 0 && (
                    <div className="text-xs text-red-500">
                      {book.discount}% off
                    </div>
                  )}
                </td>

                {/* Stock */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      (book.stock || 0) > 10
                        ? "bg-green-100 text-green-800"
                        : (book.stock || 0) > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.stock || 0} units
                  </span>
                </td>

                {/* Rating */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">
                      {book.rating ? Number(book.rating).toFixed(1) : "0.0"}
                    </span>
                    <span className="text-yellow-400 ml-1">★</span>
                  </div>
                </td>

                {/* Seller - Only show if user is not seller */}
                {user?.role !== "seller" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {book.seller?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {book.seller?.email || ""}
                    </div>
                  </td>
                )}

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    {/* Only show edit/delete for sellers on their own books or admin */}
                    {(user?.role === "seller" || user?.role === "admin") && (
                      <>
                        <button
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Edit Book"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookTable;