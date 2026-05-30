import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">
              <PiStudentBold className="text-3xl text-blue-600" />

              <h2 className="text-2xl font-bold text-blue-600">
                EduVault
              </h2>
            </div>

            <p className="mt-5 text-gray-600 leading-relaxed max-w-sm">
              Your one-stop platform for syllabus PDFs,
              previous papers, and academic resources.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-all">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-600 transition-all">
                  Syllabus
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-600 transition-all">
                  Papers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-600 transition-all">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Follow Us
            </h3>

            <div className="flex items-center gap-4 mt-5">

              <a
                href="#"
                className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-100 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 EduVault. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;