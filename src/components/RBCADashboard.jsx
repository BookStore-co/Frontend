import React, { useEffect } from 'react'
import AdminDashboard from '../pages/AdminDashboard'
import SellerDashboard from '../pages/SellerDashboard'
import UserDashboard from '../pages/UserDashboard'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
function RBCADashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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
 
    if(!user) {
        return <p>Loading...</p>;
    }
    switch(user.role) {
        case 'admin':
            return <AdminDashboard />;
        case 'seller':
            return <SellerDashboard />;
        case 'user':
            return <UserDashboard />;
        default:
            return <p>Unauthorized</p>;
    }
}

export default RBCADashboard
