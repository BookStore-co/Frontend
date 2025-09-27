import React, { useState, useEffect } from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookMarked,
  Users,
  User,
  FileUser,
  UserCircle,
  LogOut,
  Settings,
  History,
  BadgeDollarSign,
  Megaphone
} from "lucide-react";

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true); // Track sidebar state
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setUser(decoded);
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      {/* Pass expanded state and callback to Sidebar */}
      <Sidebar expanded={sidebarExpanded} onExpandedChange={setSidebarExpanded}>
        <SidebarItem text="Dashboard" icon={<LayoutDashboard />} active />
        <SidebarItem text="Sellers" icon={<User />} />
        <SidebarItem text="Users" icon={<Users />} />
        <SidebarItem text="Books" icon={<BookMarked />} />
        <SidebarItem text="Seller Registration" icon={<FileUser />} />
        <SidebarItem text="Order History" icon={<History />} />
        <SidebarItem text="Sales" icon={<BadgeDollarSign />} />
        <SidebarItem text="Announcement" icon={<Megaphone />} />
        <hr className="text-gray-200 mt-3 border-t-2" />
        <SidebarItem text="Logout" icon={<LogOut />} onClick={handleLogout} />
        <SidebarItem text="Setting" icon={<Settings />} />

        
      </Sidebar>

      {/* Dynamic padding based on sidebar state */}
      <main
        className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
          sidebarExpanded ? "pl-65" : "pl-30"
        }`}
      >
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          {/* Welcome section with profile icon on the right */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user ? `Welcome back, ${user.name}!` : "Loading..."}
              </h1>
              
            </div>

            {/* Profile Icon on the right - non-clickable */}
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
              <UserCircle size={28} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
