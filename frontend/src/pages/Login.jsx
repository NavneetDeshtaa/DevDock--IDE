import React, { useState, useContext } from 'react';
import logo from "../images/logos/logo.png";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import Spinner from '../components/Spinner';

const Login = () => {
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
    <>
      <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white whitespace-nowrap hidden sm:block">
        Login to Innovate, Create, Dominate
      </h1>

      <div className="con flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#333]">
        <form onSubmit={submitForm} className='w-[25vw] h-[auto] flex flex-col items-center bg-[#1c1c1c] p-[25px] rounded-lg shadow-xl shadow-black/50'>
          <img className='w-[230px] object-cover mb-6' src={logo} alt="logo" />

          <div className="inputBox w-full mb-4">
            <input
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              type="email"
              placeholder='Email'
              required
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="inputBox w-full mb-6">
            <input
              onChange={(e) => { setPwd(e.target.value) }}
              value={pwd}
              type="password"
              placeholder='Password'
              required
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <p className='text-gray-400 text-[14px] mt-3 self-start'>Don't have an account? <Link to="/signUp" className='text-blue-500'>Sign Up</Link></p>

          <button
            type="submit"
            className="btnNormal mt-5 bg-blue-500 text-white py-2 px-6 rounded-lg transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 flex items-center justify-center"
            disabled={loading} 
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
