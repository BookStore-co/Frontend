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
  Megaphone,
} from "lucide-react";
import { Cards, MessageCard } from "../components/Cards";
import Example from "../components/Example";
import ListCard from "../components/ListCard";
import BookList from "../components/BookList";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [usersCount, setUsersCount] = useState(0);
  const [sellersCount, setSellersCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/getUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sellersResponse = await axios.get(
        "http://localhost:5000/api/admin/getSellers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const bookResponse = await axios.get(
        "http://localhost:5000/api/books/showBooks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const booksData = bookResponse.data;
      setBookCount(booksData.length);
      const sellersData = sellersResponse.data;
      setSellersCount(sellersData.length);

      const userData = response.data;


      setUsersCount(userData.length);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const getHeading = () => {
    switch (active) {
      case "Dashboard":
        return user ? `Welcome back, ${user.name}!` : "Loading...";
      case "Sellers":
        return "Manage Sellers";
      case "Users":
        return "Manage Users";
      case "Books":
        return "Manage Books";
      case "Registration":
        return "User Registration";
      case "Orders":
        return "Order Management";
      case "Sales":
        return "Sales Overview";
      case "Announcement":
        return "Announcements";
      default:
        return "";
    }
  };

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
      // Fetch users data after setting user
      fetchUsers();
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const storeData = [
    {
      title: "Total Users",
      value: usersCount,
      icon: <Users size={30} className="text-indigo-500" />,
    },
    {
      title: "Total Sellers",
      value: sellersCount,
      icon: <User size={30} className="text-green-500" />,
    },
    {
      title: "Total Books",
      value: bookCount,
      icon: <BookMarked size={30} className="text-yellow-500" />,
    },
    {
      title: "Total Sales",
      value: "$45,000",
      icon: <BadgeDollarSign size={30} className="text-purple-500" />,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <Sidebar expanded={sidebarExpanded} onExpandedChange={setSidebarExpanded} className >
        <SidebarItem
          text="Dashboard"
          icon={<LayoutDashboard />}
          active={active === "Dashboard"}
          onClick={() => setActive("Dashboard")}
        />
        
        <SidebarItem
          text="Books"
          icon={<BookMarked />}
          active={active === "Books"}
          onClick={() => setActive("Books")}
        />
    
        <SidebarItem
          text="Orders"
          icon={<History />}
          active={active === "Orders"}
          onClick={() => setActive("Orders")}
        />

        <SidebarItem
          text="Sales"
          icon={<BadgeDollarSign />}
          active={active === "Sales"}
          onClick={() => setActive("Sales")}
        />

        <SidebarItem
          text="Announcement"
          icon={<Megaphone />}
          active={active === "Announcement"}
          onClick={() => setActive("Announcement")}
        />

        <hr className="text-gray-200 mt-3 border-t-2" />
        <SidebarItem text="Logout" icon={<LogOut />} onClick={handleLogout} />
        <SidebarItem text="Setting" icon={<Settings />} />
      </Sidebar>

      <main
        className={`flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300 ${
          sidebarExpanded ? "pl-65" : "pl-30"
        }`}
      >
        <div className="mb-6 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getHeading()}
              </h1>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
              <UserCircle size={28} />
            </div>
          </div>
        </div>

        {active === "Dashboard" && (
          <>
            <div className="flex flex-wrap gap-4">
              {storeData.map((data, idx) => (
                <Cards
                  key={idx}
                  title={data.title}
                  value={data.value}
                  icon={data.icon}
                  sidebarExpanded={sidebarExpanded}
                />
              ))}
            </div>
            <div>
              <MessageCard />
            </div>
            <div className="min-h-screen bg-gray-100">
              <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Sales Analytics
                  </h1>

                  <div className="h-96 w-full">
                    <Example />
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Interactive chart showing sales data across different
                      pages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {active === "Sellers" && (
          <>
            <ListCard type={"Sellers"} />
          </>
        )}

        {active === "Books" && (
          <>
            <BookList />
          </>
        )}

        
      </main>
    </div>
  );
}

export default Dashboard;
