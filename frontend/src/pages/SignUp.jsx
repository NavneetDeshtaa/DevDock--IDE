import React, { useState, useContext } from 'react';
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import axios from "axios";

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { api_base_url } = useContext(AppContext);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${api_base_url}/api/signUp`,
        {
          fullName: fullName,
          email: email,
          pwd: pwd
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
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error during signup:", error);
    }
  };
  
  return (
    <>

            <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-9 whitespace-nowrap hidden sm:block">
                Login to Innovate, Create, Dominate
            </h1>
      <div className="con flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#333]">
        <form onSubmit={submitForm} className='w-[25vw] h-[auto] flex flex-col items-center bg-[#1c1c1c] p-[25px] rounded-lg shadow-xl shadow-black/50'>
          <img className='w-[230px] object-cover mb-6' src={logo} alt="logo" />

          <div className="inputBox w-full mb-4">
            <input 
              onChange={(e) => { setFullName(e.target.value) }} 
              value={fullName} 
              type="text" 
              placeholder='Full Name' 
              required 
              className="w-full p-3 rounded-md bg-[#2a2a2a] text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

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

          <p className='text-gray-400 text-[14px] mt-3 self-start'>
            Already have an account? <Link to="/login" className='text-blue-500'>Login</Link>
          </p>

          <button 
            type="submit"
            className="btnNormal mt-5 bg-blue-500 text-white py-2 px-6 rounded-lg transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
