import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  //signup API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      toast.error("All fields are required.", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });
      return;
    }
    if(formData.password.length < 8){
       toast.error("Password must greater or equal 8 charecters.", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/student/signup-student", {
        ...formData,
      });

      toast.success(res.data.message, {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      navigate('/login', {replace:true});
      setFormData({
        fullname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Oops! Server Error...", {
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
    <section className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Join EduVault and access academic resources easily.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <FaUser className="text-gray-400" />

              <input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>
          </div>

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
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-medium cursor-pointer ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
