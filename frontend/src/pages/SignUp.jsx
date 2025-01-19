import React, { useState, useContext } from "react";
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner"; 

const SignUp = () => {
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
    <>
      <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-16 whitespace-nowrap hidden sm:block drop-shadow-lg">
        Sign Up to Innovate, Create, Dominate
      </h1>
      <div className="con flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <form
          onSubmit={submitForm}
          className="w-[80vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] h-auto flex flex-col items-center bg-white p-[25px] rounded-lg shadow-lg border border-gray-300"
        >
          <img
            className="w-[150px] md:w-[200px] lg:w-[230px] object-contain mb-8 rounded-full transition-transform duration-300 hover:scale-105"
            src={logo}
            alt="logo"
          />

          <div className="inputBox w-full mb-6">
            <input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="inputBox w-full mb-6">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="inputBox w-full mb-6">
            <input
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 rounded bg-gray-200 text-gray-800 placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <p className="text-gray-600 text-[14px] mt-3 self-start">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="btnNormal mt-6 bg-blue-500 text-white py-3 px-8 rounded-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            disabled={isLoading} 
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );

};

export default SignUp;
