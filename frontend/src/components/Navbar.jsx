import React from "react";
import { Code, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="flex items-center justify-between px-10 md:px-24 py-4 bg-white text-gray-800 shadow-md border-b border-gray-200">
      {/* Left Side: Logo + Branding */}
      <div className="flex items-center gap-4">
        <Code size={40} className="text-blue-600" />
        <span className="text-2xl font-bold text-gray-700">DevDock IDE</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-14 text-lg font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
      </div>

      {/* Right Side: Theme Toggle + Logout */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md transition-all hover:bg-red-600 active:scale-95"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
