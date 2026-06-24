import { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const getUser = JSON.parse(userStr);

        // If already logged in, send them straight to their dashboard
        if (getUser && getUser.role === "student") {
          navigate("/stdDash", { replace: true });
        } else if (getUser && getUser.role === "admin") {
          navigate("/adminDash", { replace: true });
        }
      } catch (error) {
        toast.success(error.response?.data?.message, {
          duration: 3000,
          position: "bottom-center",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Student Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length < 8) {
        toast.error("Password must greater or equal 8 charecters.", {
          duration: 3000,
          position: "top-center",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      } else {
        await axios
          .post(
            "https://eduvalut-backend.vercel.app/api/student/login-student",
            {
              ...formData,
            },
          )
          .then((res) => {
            toast.success("Login Success.", {
              duration: 3000,
              position: "top-center",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            });
            //Store token and user in localstorage
            localStorage.setItem("token", res.data.token);
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            
            if (res.data.user?.role === "student") {
              navigate("/stdDash", { replace: true });
            } else {
              navigate("/adminDash", { replace: true });
            }

            setFormData({
              email: "",
              password: "",
            });
          });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Server Error...", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });
    }
  };

  return (
    <section className="w-full min-h-screen `bg-gradient-to-b` from-blue-50 to-white flex items-center justify-center px-6 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
        {/* Back arrow for go to dashboard */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-blue-600 cursor-pointer hover:text-blue-800 transition-all"
        >
          <FaArrowLeft size={18} />
          <span className="font-medium">Back to Dashboard</span>
        </div>
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Login to access syllabus PDFs and previous papers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/reset"
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="text-blue-600 font-medium cursor-pointer ml-1 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
