import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react"; // added logout icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Dummy logout handler (replace with real logic later)
  const handleLogout = () => {
    navigate("/");
    console.log("User logged out!");
    // e.g. clear token, redirect to login page
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / App Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              BenkyōLog
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <p
              onClick={() => navigate("dashboard")}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Dashboard
            </p>
            <p
              onClick={() => navigate("addLogs")}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Add Log
            </p>
            <p
              onClick={() => navigate("history")}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Log History
            </p>

            {/* Logout Icon */}
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={22} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-3">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/add-log"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Add Log
            </Link>
            <Link
              to="/log-history"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Log History
            </Link>

            {/* Logout in Mobile Menu */}
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-500 font-medium"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
