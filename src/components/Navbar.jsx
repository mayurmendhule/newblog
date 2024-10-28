//Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { showSuccessAlert } from "../service/alertService";

function Navbar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
    showSuccessAlert("Logout successfully");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="border-b py-4 px-4 sm:px-8 bg-white flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        {/* Left Side - Logo and Navigation Links */}
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold"></Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="btn btn-square btn-ghost lg:hidden"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Main Menu */}
          <nav
            id="navmain"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } lg:flex lg:items-center mt-0 lg:gap-5 lg:ml-4 lg:static absolute top-16 left-0 w-80 lg:w-auto bg-white lg:bg-transparent z-50 lg:z-auto transition-all duration-300`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 lg:p-0 shadow lg:shadow-none">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogform"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Write a Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side - Search Bar and Auth Links */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Search Bar */}
          <div className="flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded focus-within:outline focus-within:outline-blue-600">
            <input
              type="text"
              placeholder="Search something..."
              className="w-full text-sm bg-transparent rounded outline-none pr-2"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="cursor-pointer fill-gray-400"
            >
              <path d="..." />
            </svg>
          </div>

          {/* Auth Links */}
          {isLoggedIn ? (
            <>
              <div className="relative inline-block">
                <img
                  src="" // Add user profile image URL
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-green-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {!isLoginPage && (
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-green-600"
                >
                  Login
                </Link>
              )}
              {!isRegisterPage && (
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm rounded-full text-white bg-blue-600 hover:bg-green-600"
                >
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
