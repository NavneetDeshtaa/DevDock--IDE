import { Code2, Terminal, Monitor } from "lucide-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../components/Spinner";
import { ArrowLeft } from "lucide-react";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const { api_base_url } = useContext(AppContext);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter an email before verifying.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await axios.post(`${api_base_url}/api/send-otp`, {
        email,
      });

      if (response.data.success) {
        toast.success("OTP sent successfully!");
        setIsOtpSent(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.msg === "Email is already registered"
      ) {
        toast.error("This email is already registered. Please log in.");
      } else {
        toast.error(
          "Failed to send OTP. Try again. Or Change Network if issue continues.."
        );
      }
      console.error(error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!email || !otp) {
      toast.error("Please enter OTP and ensure email is provided.");
      return;
    }

    try {
      const response = await axios.post(
        `${api_base_url}/api/verify-otp`,
        { email, otp },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Email verified successfully!");
        setIsOtpVerified(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "OTP verification failed. Try again."
      );
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      toast.error("Please verify your email first!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${api_base_url}/api/signup`,
        { fullName, email, pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Account created successfully. Now login to continue!");
        navigate("/login");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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

      {/* Header - Hidden on small screens */}
      <div className="hidden sm:flex absolute top-11 left-1/2 transform -translate-x-1/2 items-center space-x-4 text-gray-700">
        <Terminal size={48} className="text-gray-500" />
        <h2 className="text-2xl font-semibold">Your NextGen Code Playground</h2>
      </div>

      {/* Footer - Hidden on small screens */}
      <div className="hidden sm:flex absolute bottom-10 right-10 items-center space-x-4 text-gray-700">
        <Monitor size={48} className="text-gray-500" />
        <h3 className="text-2xl font-medium">Code. Debug. Deploy.</h3>
      </div>

      {/* Sign Up Form */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-10 mt-4 sm:mt-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Code2 size={36} className="text-blue-600 sm:size-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Join us to start your journey
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email and OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-2/3 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
                disabled={isOtpVerified}
              />
              <button
                type="button"
                onClick={sendOtp}
                className={`w-full sm:w-1/3 px-4 py-2.5 rounded-lg font-medium text-white transition-all ${
                  isOtpVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isOtpVerified || isSendingOtp}
              >
                {isOtpVerified ? (
                  "Verified"
                ) : isSendingOtp ? (
                  <Spinner />
                ) : (
                  "Verify Email"
                )}
              </button>
            </div>
          </div>

          {/* OTP Input */}
          {isOtpSent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full sm:w-2/3 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter OTP"
                  required
                  disabled={isOtpVerified}
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className={`w-full sm:w-1/3 px-4 py-2.5 rounded-lg font-medium text-white transition-all ${
                    isOtpVerified
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={isOtpVerified}
                >
                  {isOtpVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className={`w-full py-2.5 rounded-lg font-medium text-white transition-all ${
              isOtpVerified
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isOtpVerified || isLoading}
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
