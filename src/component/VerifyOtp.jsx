import { useEffect, useState } from "react";
import { MdSms } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BeatLoader } from "react-spinners";
const VerifyOtp = () => {
  const [timer, setTimer] = useState(300);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const naviget = useNavigate();

  // OTP Timer
  useEffect(() => {
    const expireTime = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(expireTime);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(expireTime);
  }, []);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  //Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(!otp){
        toast.error("OTP is require.", {
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
      const email = localStorage.getItem("emailVerify");
      if (timer === 0) {
        alert("OTP Expired");
        return;
      }
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "https://eduvalut-backend.vercel.app/api/pass/verifyOtp",
        { email, otp },
        options,
      );
      toast.success("OTP Verify Successfully.", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });
      naviget("/newPassword");
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
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-5">Verify OTP</h1>

          <p className="text-gray-500 mt-2 text-center leading-relaxed">
            Enter OTP and change your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          {/* OTP Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>

            <div className="mt-2 flex items-center border border-blue-100 rounded-xl px-4 focus-within:border-blue-500 transition-all duration-300">
              <MdSms className="text-gray-400" />

              <input
                type="number"
                placeholder="Enter OTP"
                className="w-full px-3 py-3 outline-none bg-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Timer */}
          <p className="text-gray-500 mt-6">
            OTP expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </p>

          {/* Button */}
          <button
            type="submit"
            disabled={timer === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-300 mt-6"
          >
            {loading ? <BeatLoader /> : "Verify OTP"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VerifyOtp;
