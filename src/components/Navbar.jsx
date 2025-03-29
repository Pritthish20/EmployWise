import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector((state) => state.auth.userInfo); 

    const handleLogout = () => {
        dispatch(logout()); 
        toast.success("Logged out successfully!");
        navigate("/");
    };
    
    const userMenu = [
        { label: "Users", to: "/users" },
        { label: "Logout", to: "/", onClick: handleLogout },
    ];
    
    const guestMenu = [
        { label: "Login", to: "/" },
        { label: "Signup", to: "/signup" },
    ];

    return (
        <nav className="bg-blue-900 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
          
                <div className="flex items-center gap-2">
                    <PiUserCircle size={30} color="#ffffff" />
                    <span className="text-2xl font-semibold">User Management</span>
                </div>
       
                <div className="hidden md:flex gap-6 items-center">
                    {(userInfo ? userMenu : guestMenu).map((menu, index) => (
                        <Link
                            key={index}
                            to={menu.to}
                            onClick={menu.onClick || (() => {})}
                            className="text-lg font-medium hover:text-blue-400 transition duration-200"
                        >
                            {menu.label}
                        </Link>
                    ))}
                   
                    {userInfo && (
                        <div className="flex items-center gap-2">
                            {userInfo.avatar ? (
                                <img
                                    src={userInfo.avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            ) : (
                                <PiUserCircle size={40} />
                            )}
                            <span className="text-lg font-medium">{userInfo.first_name}</span>
                        </div>
                    )}
                </div>

                {/* Mobile Menu  */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-800 text-white mt-2 p-2">
                    {(userInfo ? userMenu : guestMenu).map((menu, index) => (
                        <Link
                            key={index}
                            to={menu.to}
                            onClick={() => {
                                if (menu.onClick) menu.onClick();
                                setIsMenuOpen(false);
                            }}
                            className="block px-4 py-2 text-lg font-medium hover:bg-blue-600 transition duration-200"
                        >
                            {menu.label}
                        </Link>
                    ))}
      
                    {userInfo && (
                        <div className="flex items-center gap-2 px-4 py-2">
                            {userInfo.avatar ? (
                                <img
                                    src={userInfo.avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            ) : (
                                <PiUserCircle size={40} />
                            )}
                            <span className="text-lg font-medium">{userInfo.first_name}</span>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
