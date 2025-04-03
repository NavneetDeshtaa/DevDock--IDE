import React, { useState } from "react";
import { Code2, Home, FolderKanban, PhoneCall, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const userName = localStorage.getItem("username") || "User";

  const userInitial = userName.charAt(0).toUpperCase();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-lg shadow-lg border-b border-gray-300 z-50">
      <div className="container mx-auto px-10 md:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-blue-600 animate-pulse-glow" />
            <span className="text-3xl font-bold gradient-text">
              DevDock-IDE
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg ${location.pathname === "/" ? "bg-gray-200 text-blue-700  scale-105 shadow-md" : ""}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/projects"
              className={`flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg ${location.pathname === "/projects" ? "bg-gray-200 text-blue-700 scale-105 shadow-md" : ""}`}
            >
              <FolderKanban className="w-5 h-5" />
              <span>My Projects</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg ${location.pathname === "/contact" ? "bg-gray-200 text-blue-700 scale-105 shadow-md" : ""}`}
            >
              <PhoneCall className="w-5 h-5" />
              <span>Contact</span>
            </Link>

            {!isLoggedIn ? (
              <Link to="/signup">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4 relative">
                <div
                  className="relative flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full text-lg font-semibold cursor-pointer transition-all hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {userInitial}

                  {/* Tooltip (Full Name) */}
                  {isHovered && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg transition-opacity duration-200">
                      {userName}
                    </div>
                  )}
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <LogOut className="w-3 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
