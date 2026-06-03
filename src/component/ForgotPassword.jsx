import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //Forgot password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setIsLoading(true);
      await axios.post(
        "https://eduvalut-backend.vercel.app/api/pass/forgotPass",
        { email },
        options,
      );
      toast.success("OTP send your register email.", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });
      localStorage.setItem("emailVerify", email);
      navigate("/verifyotp");
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
    } finally {
      setIsLoading(false);
    }

    
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
        {/* Back Button */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all duration-300"
        >
          <MdArrowBack size={20} />
          Back
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2 text-center leading-relaxed">
            Enter your registered email address and we’ll send you an OTP to
            reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-3 outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-300 mt-6"
          >
            {isLoading ? <BeatLoader /> : "Send OTP"}
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 mt-6">
          Remember your password?
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

export default ForgotPassword;
