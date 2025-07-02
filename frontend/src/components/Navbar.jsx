import React, { useState } from "react";
import {
  Code2,
  Home,
  FolderKanban,
  PhoneCall,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  const userName = localStorage.getItem("username") || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const navLinkClass = (path) =>
    `flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg ${
      location.pathname === path
        ? "bg-gray-200 text-blue-700 scale-105 shadow-md"
        : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-lg shadow-lg border-b border-gray-300 z-50">
      <div className="container mx-auto px-6 md:px-24 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-blue-600 animate-pulse-glow" />
            <span className="text-2xl md:text-3xl font-bold gradient-text">
              DevDock-IDE
            </span>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none transition"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkClass("/")}>
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/projects" className={navLinkClass("/projects")}>
              <FolderKanban className="w-5 h-5" />
              <span>My Projects</span>
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")}>
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

                  {isHovered && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-sm px-3 py-1 rounded-lg shadow-lg transition-opacity duration-200">
                      {userName}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <LogOut className="w-4 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden space-y-4">
            <Link to="/" className={navLinkClass("/")} onClick={() => setIsMobileMenuOpen(false)}>
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link to="/projects" className={navLinkClass("/projects")} onClick={() => setIsMobileMenuOpen(false)}>
              <FolderKanban className="w-5 h-5" />
              <span>My Projects</span>
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")} onClick={() => setIsMobileMenuOpen(false)}>
              <PhoneCall className="w-5 h-5" />
              <span>Contact</span>
            </Link>

            {!isLoggedIn ? (
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                    {userInitial}
                  </div>
                  <span className="text-gray-800">{userName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4 inline mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
