import { Code2, Terminal, Monitor } from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeft } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const { api_base_url } = useContext(AppContext);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${api_base_url}/api/login`,{ email, pwd },{ headers: { "Content-Type": "application/json" }});

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", response.data.fullName);

        toast.success("Logged in successfully!");
        window.location.href = "/";
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Incorrect Password or Email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#c7d2fe] flex items-center justify-center p-4 sm:p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-10 sm:left-10 flex items-center space-x-2 sm:space-x-4 text-gray-700 bg-white p-2 sm:p-3 rounded-lg shadow-md"
      >
        <ArrowLeft size={20} className="text-gray-500 sm:size-6" />
        <span className="text-sm sm:text-base text-gray-700">Back</span>
      </button>

      {/* Top Center Header */}
      <div className="absolute top-20 sm:top-11 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left text-gray-700">
        <Terminal size={40} className="text-gray-500 mb-2 sm:mb-0 sm:size-12" />
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
          Your NextGen Code Playground
        </h2>
      </div>

      {/* Bottom Right Tagline */}
      <div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10 flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-right text-gray-700">
        <Monitor size={40} className="text-gray-500 sm:size-12 mb-2 sm:mb-0" />
        <h3 className="text-xl sm:text-3xl font-medium">
          Code. Debug. Deploy.
        </h3>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Code2 size={36} className="text-blue-600 sm:size-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Log in to continue your journey
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Don&apos;t have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
