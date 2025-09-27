import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LibrarySection from "./pages/Landing";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RBCADashboard from "./components/RBCADashboard";
// Main App component
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
          </Routes>
        </div>
      </Router>
  );
}

export default App;
