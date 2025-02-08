import { Code2, Terminal, Monitor } from 'lucide-react';
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner"; 

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
  
    const { api_base_url } = useContext(AppContext);
    const navigate = useNavigate();
  
    const submitForm = async (e) => {
      e.preventDefault();
      setIsLoading(true); 
  
      try {
        const response = await axios.post(
          `${api_base_url}/api/signUp`,
          {
            fullName: fullName,
            email: email,
            pwd: pwd,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
  
        const data = response.data;
        if (data.success) {
          toast.success("Account created successfully. Now login to continue!");
          navigate("/login");
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.error("Error during signup:", error);
      } finally {
        setIsLoading(false);
      }
    };

  return (

<div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center p-4 relative">
  
  <div className="absolute top-10 left-10 flex items-center space-x-4 text-gray-700">
    <Terminal size={50} className="text-gray-500" />
    <h2 className="text-xl font-semibold">Your NextGen Code Playground</h2>
  </div>

  <div className="absolute bottom-10 right-10 flex items-center space-x-4 text-gray-700">
    <Monitor size={50} className="text-gray-500" />
    <h3 className="text-lg font-medium">Code. Debug. Deploy.</h3>
  </div>

  <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <Code2 size={40} className="text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Create Your Account
      </h1>
      <p className="text-gray-600">Join us to start your journey</p>
    </div>

    <form onSubmit={submitForm} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          placeholder="Create a password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={isLoading} 
      >
        {isLoading ? <Spinner /> : "Sign Up"}
      </button>
    </form>

    <p className="mt-6 text-center text-gray-600">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
        Login
      </Link>
    </p>
  </div>
</div>

  );
}

export default Signup;