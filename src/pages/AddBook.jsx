import React, { useState } from "react";

function AddBook() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-indigo-100 pt-20 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-md mt-10 shadow-sm p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Add New Book
        </h1>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
          <div className="flex flex-col items-center gap-6 bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Book Cover Image
              </h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer transition-all duration-300"
              />
            </div>
            {image && (
              <div className="relative group">
                <img
                  src={image}
                  alt="Book Cover"
                  className="w-48 h-72 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
            {!image && (
              <div className="w-48 h-72 bg-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📚</div>
                  <p className="text-sm">Preview will appear here</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                placeholder="Enter author name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Enter book description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full px-4 py-3 border  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white">
                <option value="">Select category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="biography">Biography</option>
                <option value="comics">Comics</option>
                <option value="fantasy">Fantasy</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl">
                Add Book
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
