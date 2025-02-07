import { Code2 } from 'lucide-react';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import Spinner from '../components/Spinner';

function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [loading, setLoading] = useState(false); 
    const { api_base_url } = useContext(AppContext);
  
    const submitForm = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await axios.post(
          `${api_base_url}/api/login`,
          {
            email: email,
            pwd: pwd
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
  
        const data = response.data;
  
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", data.fullName);
  
          toast.success("Logged in successfully!");
          window.location.href = "/";
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login.");
      } finally {
        setLoading(false); 
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code2 size={40} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Login to Innovate, Create, Dominate
          </h1>
          <p className="text-gray-600">Enter your details to access your account</p>
        </div>

        <form onSubmit={submitForm} className="space-y-6">

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
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading} 
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signUp" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;