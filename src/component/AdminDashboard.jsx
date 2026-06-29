import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaFilePdf, FaFileAlt, FaBook, FaSignOutAlt } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
// import { IoHomeOutline } from "react-icons/io5";
import ManagePdf from "./admin/ManagePdf";
import ManagePaper from "./admin/ManagePaper";
import ManageSyllabus from "./admin/ManageSyllabus";
import ManageFeedback from "./admin/ManageFeedback";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [activeTab, setActiveTab] = useState("pdf");

  const decoded = JSON.parse(localStorage.getItem("user")) || {};
  const initialLetter = user?.fullname?.charAt(0).toUpperCase() || "?";

  // Logout
  const logoutAdmin = async () => {
    await axios.post(
      "https://eduvalut-backend.vercel.app/api/student/logout",
      {},
      { withCredentials: true },
    );
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // Render Right Component
  const renderContent = () => {
    switch (activeTab) {
      case "pdf":
        return <ManagePdf />;

      case "paper":
        return <ManagePaper />;

      case "syllabus":
        return <ManageSyllabus />;

      case "feedback":
        return <ManageFeedback />;

      default:
        return <ManagePdf />;
    }
  };

  return (
    <section className="h-screen flex `bg-gradient-to-b` from-blue-50 to-white">
      {/* SIDEBAR */}
      <aside
        className={`
          bg-white border-r border-blue-100 shadow-sm
          transition-all duration-300
          flex flex-col
          ${open ? "w-[250px]" : "w-[80px]"}
        `}
      >
        {/* TOP */}
        <div className="h-[80px] border-b border-blue-100 flex items-center justify-center">
          {open ? (
            <div className="w-full px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <PiStudentBold className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-gray-900">EduVault</h1>

                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-blue-600"
              >
                <HiOutlineMenuAlt3 size={24} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="text-gray-600 hover:text-blue-600"
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
          )}
        </div>

        {/* MENU */}
        <div className="flex-1 px-3 py-5 space-y-3">
          {/* PDF */}
          <button
            onClick={() => setActiveTab("pdf")}
            className={`
              w-full flex items-center gap-4
              px-4 py-3 rounded-2xl
              transition-all duration-300

              ${
                activeTab === "pdf"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaFilePdf className="text-lg" />

            {open && <span>Manage PDFs</span>}
          </button>

          {/* PAPER */}
          <button
            onClick={() => setActiveTab("paper")}
            className={`
              w-full flex items-center gap-4
              px-4 py-3 rounded-2xl
              transition-all duration-300

              ${
                activeTab === "paper"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaFileAlt className="text-lg" />

            {open && <span>Manage Papers</span>}
          </button>

          {/* SYLLABUS */}
          <button
            onClick={() => setActiveTab("syllabus")}
            className={`
              w-full flex items-center gap-4
              px-4 py-3 rounded-2xl
              transition-all duration-300

              ${
                activeTab === "syllabus"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaBook className="text-lg" />

            {open && <span>Manage Syllabus</span>}
          </button>
          {/* FEEDBACK */}
          <button
            onClick={() => setActiveTab("feedback")}
            className={`
              w-full flex items-center gap-4
              px-4 py-3 rounded-2xl
              transition-all duration-300

              ${
                activeTab === "feedback"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaCommentDots className="text-lg" />

            {open && <span>Manage Feedback</span>}
          </button>
        </div>

        {/* USER */}
        <div className="border-t border-blue-100">
          <div className="flex items-center gap-3 px-3 py-3 bg-blue-50">
            <div
              className="
                w-10 h-10 rounded-full
                bg-blue-600 text-white
                flex items-center justify-center
                font-bold text-lg
              "
            >
              {initialLetter}
            </div>

            {open && (
              <div>
                <h3 className="font-semibold text-gray-800">
                  {decoded.fullname}
                </h3>

                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
            {/* <div className="ml-auto">
              <Link to="/">
                <IoHomeOutline size={25} />
              </Link>
            </div> */}
          </div>
        </div>

        {/* LOGOUT */}
        <div className="p-3 border-t border-blue-100">
          <button
            onClick={logoutAdmin}
            className="
              w-full flex items-center gap-4
              px-4 py-3 rounded-2xl
              text-red-500 hover:bg-red-50
              transition-all duration-300
            "
          >
            <FaSignOutAlt className="text-lg" />

            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* RIGHT SIDE */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </section>
  );
};

export default AdminDashboard;
