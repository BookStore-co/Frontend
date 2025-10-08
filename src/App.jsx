import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibrarySection from "./pages/Landing";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RBCADashboard from "./components/RBCADashboard";
import Example from "./components/Example";
import GraphPage from "./components/GraphPage";
import ListCard from "./components/ListCard";
import BookList from "./components/BookList";
import SellerRegistration from "./pages/SellerRegistration"
import Profile from "./pages/Profile";
import BookPage from "./pages/BookPage";
import ShowBooks from "./pages/ShowBooks";
import AddBook from "./pages/AddBook";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LibrarySection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<RBCADashboard />} />
          <Route path="/graph" element={<GraphPage />} />{" "}
          <Route path="/getSeller" element={<BookList />} />
          <Route path="/sellerRegister" element={<SellerRegistration />} />
          <Route path="/profile/:sellerId" element={<Profile />} />
          <Route path="/books" element={<ShowBooks />} />
          <Route path="/addBook" element={<AddBook />} />
          {/* Update this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
