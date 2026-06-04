import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
        <div className="max-w-8xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <PiStudentBold className="text-3xl text-blue-600" />

              <h1 className="text-2xl font-bold text-blue-600">EduVault</h1>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-all duration-300"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-all duration-300"
                >
                  Syllabus
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-all duration-300"
                >
                  Papers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-blue-600 transition-all duration-300"
                >
                  Feedback
                </a>
              </li>
            </ul>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <IoClose size={30} /> : <HiOutlineMenuAlt3 size={30} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden py-6 border-t border-gray-100">
              <ul className="flex flex-col gap-5 text-gray-700 font-medium">
                <li>
                  <a href="#" onClick={() => setOpen(false)}>
                    Home
                  </a>
                </li>

                <li>
                  <a href="#" onClick={() => setOpen(false)}>
                    Syllabus
                  </a>
                </li>

                <li>
                  <a href="#" onClick={() => setOpen(false)}>
                    Papers
                  </a>
                </li>

                <li>
                  <a href="#" onClick={() => setOpen(false)}>
                    Feedback
                  </a>
                </li>
              </ul>

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-4 mt-6">
                <button className="border border-gray-300 py-2.5 rounded-lg font-medium text-gray-700">
                  Login
                </button>

                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium">
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
