import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-blue-100 p-10 text-center">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center">
            <PiStudentBold className="text-5xl text-blue-600" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-blue-600 mt-6">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-3 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or return to the EduVault home page.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-300"
        >
          <FaHome />
          Back to Home
        </Link>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-6">
          EduVault • Learning Resources Platform
        </p>
      </div>
    </section>
  );
};

export default NotFound;
