import React from "react";
import coverImage from "../assets/cover.png";

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#f7f5f0] via-[#f0ede4] to-[#e8e3d7] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=&quot;20&quot; height=&quot;20&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;%23000&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left lg:pr-12 mb-12 lg:mb-0">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
                  Welcome to BookShelf
                </div>

                {/* Main Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight font-quicksand">
                    Discover Your Next{" "}
                    <span className="block text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Great Read
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                    Explore thousands of books from your favorite authors. Find bestsellers, discover new genres, and build your personal library with ease.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Browse Books
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Books Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5K+</div>
                    <div className="text-sm text-gray-600">Happy Readers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Authors</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="flex-1 relative">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                {/* Background Decorations */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
                
                {/* Main Image Container */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={coverImage} 
                    alt="BookShelf Hero" 
                    className="w-full h-auto rounded-xl object-cover shadow-lg"
                  />
                  <div className="absolute -top-6 -left-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform -rotate-12">
                    📚 New Arrivals
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-green-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                    ⭐ Bestsellers
                  </div>
                </div>

                {/* Additional Floating Cards */}
                <div className="absolute top-1/4 -left-8 bg-white rounded-lg shadow-lg p-3 max-w-xs hidden lg:block transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">📖</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
                      <div className="text-xs text-gray-600">On orders over $50</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-1/4 -right-8 bg-white rounded-lg shadow-lg p-3 max-w-xs hidden lg:block transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">🚚</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Fast Delivery</div>
                      <div className="text-xs text-gray-600">2-3 business days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-roboto-condensed">
              Why Choose BookShelf?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best reading experience with our curated collection and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vast Collection</h3>
              <p className="text-gray-600">Over 10,000 books across all genres, from bestsellers to rare finds.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping. Get your books within 2-3 business days.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">All books are carefully inspected and guaranteed to be in excellent condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-roboto-condensed">
              Popular Categories
            </h2>
            <p className="text-lg text-gray-600">
              Explore our most loved book categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Fiction", emoji: "📚", books: "2,500+" },
              { name: "Mystery", emoji: "🔍", books: "1,200+" },
              { name: "Romance", emoji: "💕", books: "1,800+" },
              { name: "Sci-Fi", emoji: "🚀", books: "900+" },
              { name: "Biography", emoji: "👤", books: "600+" },
              { name: "History", emoji: "🏛️", books: "800+" },
              { name: "Technology", emoji: "💻", books: "400+" },
              { name: "Self Help", emoji: "🌟", books: "700+" }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.books} books</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-roboto-condensed">
              What Our Readers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Book Enthusiast",
                text: "Amazing collection and super fast delivery! I've found books here that I couldn't find anywhere else.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Student",
                text: "Great prices and excellent condition books. Perfect for my studies and leisure reading.",
                rating: 5
              },
              {
                name: "Emily Davis",
                role: "Teacher",
                text: "BookShelf has become my go-to for classroom materials. Reliable and affordable!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-roboto-condensed">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of happy readers and discover your next favorite book today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Books Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Sign Up Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-indigo-400">BookShelf</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner in discovering amazing books. We connect readers with the stories that matter.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span>📘</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span>📖</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                  <span>📚</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BookShelf. All rights reserved. Made with ❤️ for book lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;