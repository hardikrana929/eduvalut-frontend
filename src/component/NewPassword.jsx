import { useState } from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { BeatLoader } from "react-spinners";

import { useNavigate } from "react-router-dom";
const NewPassword = () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPassConf, setIsShowPassConf] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //Change Password
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const email = localStorage.getItem("emailVerify");

      // Empty fields
      if (!pass || !confirmPass) {
        toast.error("All fields are required.", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      // Password length
      if (pass.length < 8 || confirmPass.length < 8) {
        toast.error("Password must be greater than or equal to 8 characters.", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      // Match password
      if (pass !== confirmPass) {
        toast.error("Please enter same password.", {
          duration: 3000,
          position: "top-center",
        });
        return;
      }

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "https://eduvalut-backend.vercel.app/api/pass/updatePass",
        {
          email,
          newPassword: pass,
        },
        options,
      );

      toast.success("Password Changed Successfully.", {
        duration: 3000,
        position: "top-center",
      });

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Oops! Server Error...", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6 py-12">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
        {/* Back Button
        <Link
          to="/login"
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all duration-300"
        >
          <MdArrowBack size={20} />
          Back
        </Link> */}

        {/* Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">
            Set New Password
          </h1>

          <p className="text-gray-500 mt-2 text-center leading-relaxed">
            Remember your new Password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <MdOutlineSecurity className="text-gray-400" />

              <input
                type={isShowPass ? "text" : "password"}
                placeholder="Enter New Password"
                className="w-full px-3 py-3 outline-none bg-transparent"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setIsShowPass(!isShowPass)}
                className="text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {isShowPass ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <MdOutlineSecurity className="text-gray-400" />

              <input
                type={isShowPassConf ? "text" : "password"}
                placeholder="Enter Confirm Password"
                className="w-full px-3 py-3 outline-none bg-transparent"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => isShowPassConf(!isShowPassConf)}
                className="text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {isShowPassConf ? (
                  <FaRegEyeSlash size={18} />
                ) : (
                  <FaRegEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-300 mt-6"
          >
            {loading ? (
              <div className="flex justify-center">
                <BeatLoader color="white" size={10} />
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewPassword;
