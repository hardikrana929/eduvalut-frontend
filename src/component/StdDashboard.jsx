import { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  FaFilePdf,
  FaBook,
  FaFileAlt,
  FaSearch,
  FaSignOutAlt,
  FaDownload,
  FaCommentDots,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { SkeletonCard } from "./SkeletonCard";
import { PiStudentBold } from "react-icons/pi";
import axios from "axios";
import toast from "react-hot-toast";

const StdDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  //Logout feature
  const logoutStd = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };
  const [openFeedback, setOpenFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const initialLatter = user?.fullname?.charAt(0).toUpperCase();
  const [branchFilter, setBranchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [activeTab, setActiveTab] = useState("Material");
  const [pdfList, setPdfList] = useState([]);
  const [paperList, setPaperList] = useState([]);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [search, setSearch] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [paperLoading, setPaperLoading] = useState(false);
  const token = localStorage.getItem("token");
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  let currentTab = [];

  if (activeTab === "Material") {
    currentTab = pdfList.filter((each) => each.syllabus_type === "Material");
  } else if (activeTab === "paper") {
    currentTab = paperList;
  } else if (activeTab === "Syllabus") {
    currentTab = pdfList.filter((each) => each.syllabus_type === "Syllabus");
  }
  const isLoading = activeTab === "paper" ? paperLoading : pdfLoading;
  //Filter pdfs
  const filteredData = currentTab.filter((pdf) => {
    const matchesSearch = (pdf.title || pdf.subject_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBranch = branchFilter
      ? String(pdf.branch_id) === String(branchFilter)
      : true;

    const matchesSemester = semesterFilter
      ? String(pdf.semester_id) === String(semesterFilter)
      : true;

    return matchesSearch && matchesBranch && matchesSemester;
  });
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  //Get Pdf data
  const getPdfData = useCallback(async () => {
    try {
      setPdfLoading(true);

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        "https://eduvalut-backend.vercel.app/api/pdf/getPdfs",
        options,
      );
      setPdfList(result.data.data);
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
      setPdfLoading(false);
    }
  }, []);
  //Send Feedback
  const sendFeedBack = async () => {
    try {
      setPdfLoading(true);
      const localUser = JSON.parse(localStorage.getItem("user"));
      const newObj = {
        userId: localUser.id,
        rating: rating,
        message: description,
      };
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "https://eduvalut-backend.vercel.app/api/feedback/addFeedback",
        newObj,
        options,
      );
      toast.success("Feedback added successfully.", {
        duration: 3000,
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "10px",
          color: "#713200",
        },
      });

      setOpenFeedback(false);
      setRating(0);
      setDescription("");
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
      setPdfLoading(false);
    }
  };
  //Get Paper data
  const getPaperData = useCallback(async () => {
    try {
      setPaperLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        "https://eduvalut-backend.vercel.app/api/paper/getPaper",
        options,
      );
      setPaperList(result.data.data);
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
      setPaperLoading(false);
    }
  }, []);
  //Get Branch
  const getBranchData = useCallback(async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        "https://eduvalut-backend.vercel.app/api/branch/getBranch",
        options,
      );

      setBranches(result.data.data);
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
  }, []);
  //GET Semester
  const getSemesterData = useCallback(async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        "https://eduvalut-backend.vercel.app/api/semester/getSemester",
        options,
      );

      setSemesters(result.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Server Error...");
    }
  }, []);

  useEffect(() => {
    getPdfData();
    getPaperData();
    getBranchData();
    getSemesterData();
  }, [getPdfData, getPaperData, getBranchData, getSemesterData]);

  // RESET PAGE WHEN TAB/FILTER/SEARCH CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search, branchFilter, semesterFilter]);
  return (
    <section className="h-screen flex bg-gradient-to-b from-blue-50 to-white overflow-hidden">
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
          {/* OPEN SIDEBAR */}
          {open ? (
            <div className="w-full px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <PiStudentBold className="text-2xl text-blue-600" />
                </div>

                <div>
                  <h1 className="text-lg font-bold text-gray-900">EduVault</h1>

                  <p className="text-xs text-gray-500">Student Panel</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300"
              >
                <HiOutlineMenuAlt3 size={24} />
              </button>
            </div>
          ) : (
            /* CLOSE SIDEBAR */
            <button
              onClick={() => setOpen(true)}
              className="text-gray-600 hover:text-blue-600 transition-all duration-300"
            >
              <HiOutlineMenuAlt3 size={24} />
            </button>
          )}
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-3 py-5 space-y-3">
          {/* PDFs */}
          <button
            onClick={() => setActiveTab("Material")}
            className={`
              w-full
              flex items-center
              gap-4
              px-4 py-3
              rounded-2xl
              transition-all duration-300

              ${
                activeTab === "Material"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            <FaFilePdf className="text-lg flex-shrink-0" />

            {open && <span>PDFs</span>}
          </button>

          {/* Papers */}
          <button
            onClick={() => setActiveTab("paper")}
            className={`
                w-full
                flex items-center
                gap-4
                px-4 py-3
                rounded-2xl
                transition-all duration-300

                ${
                  activeTab === "paper"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }
              `}
          >
            <FaFileAlt className="text-lg flex-shrink-0" />

            {open && <span>Papers</span>}
          </button>

          {/* Syllabus */}
          <button
            onClick={() => setActiveTab("Syllabus")}
            className={`
                    w-full
                    flex items-center
                    gap-4
                    px-4 py-3
                    rounded-2xl
                    transition-all duration-300

                    ${
                      activeTab === "Syllabus"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
          >
            <FaBook className="text-lg flex-shrink-0" />

            {open && <span>Syllabus</span>}
          </button>
        </div>
        {/* Feedback */}
        <button
          onClick={() => setOpenFeedback(true)}
          className="
            w-full
            flex items-center gap-4
            px-4 py-3
            rounded-2xl
            text-gray-700
            hover:bg-blue-50
            hover:text-blue-600
            transition-all duration-300
          "
        >
          <FaCommentDots className="text-2xl" />
          {open && <span className="text-xl">Feedback</span>}
        </button>
        {/* USER PROFILE */}
        <div className=" border-t border-blue-100 ">
          <div
            className="
              flex items-center gap-3
              px-3 py-3              
              bg-blue-50
            "
          >
            {/* PROFILE LETTER */}
            <div
              className="
                    w-10 h-10
                    rounded-full
                    bg-blue-600
                    text-white
                    flex items-center justify-center
                    font-bold text-lg
                  "
            >
              {initialLatter}
            </div>

            {/* USER INFO */}
            {open && (
              <div>
                <h3 className="font-semibold text-gray-800">
                  {user?.fullname || user?.username}
                </h3>

                <p className="text-xs text-gray-500">Student</p>
              </div>
            )}
          </div>
        </div>
        {/* LOGOUT */}
        <div className="p-3 border-t border-blue-100">
          <button
            className="
              w-full
              flex items-center
              gap-4
              px-4 py-3
              rounded-2xl
              text-red-500
              hover:bg-red-50
              transition-all duration-300
            "
            onClick={logoutStd}
          >
            <FaSignOutAlt className="text-lg flex-shrink-0" />

            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* RIGHT SECTION */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-4">
          {/* CARD 1 */}
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">PDFs</p>

                <h2 className="text-4xl font-bold text-blue-600 mt-2">
                  {
                    pdfList.filter((item) => item.syllabus_type === "Material")
                      .length
                  }
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <FaFilePdf className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Papers</p>

                <h2 className="text-4xl font-bold text-green-600 mt-2">
                  {paperList.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <FaFileAlt className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-purple-50 border border-purple-100 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Syllabus</p>

                <h2 className="text-4xl font-bold text-purple-600 mt-2">
                  {
                    pdfList.filter((item) => item.syllabus_type === "Syllabus")
                      .length
                  }
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                <FaBook className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          {/* SEARCH */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search PDFs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              h-[50px]
              pl-11 pr-4
              border border-gray-200
              rounded-2xl
              outline-none
              focus:border-blue-400
              text-sm
            "
            />
          </div>

          {/* BRANCH FILTER */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="
    h-[50px]
    min-w-[180px]
    border border-blue-100
    rounded-2xl
    px-4
    outline-none
    bg-white
    text-gray-700
    focus:border-blue-400
  "
          >
            <option value="">All Branches</option>

            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.branch_name}
              </option>
            ))}
          </select>

          {/* SEMESTER FILTER */}
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="
            h-[50px]
            min-w-[180px]
            border border-blue-100
            rounded-2xl
            px-4
            outline-none
            bg-white
          "
          >
            <option value="">All Semesters</option>

            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.semester_name}
              </option>
            ))}
          </select>
        </div>
        {/* PDF RESULT CARDS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {isLoading ? (
            [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
          ) : currentData.length === 0 ? (
            // EMPTY STATE
            <div
              className="
                col-span-full
                flex flex-col items-center justify-between
                py-20
              "
            >
              {/* ICON */}
              <div
                className="
          w-24 h-24
          rounded-full
          bg-blue-50
          flex items-center justify-center
        "
              >
                <FaFilePdf className="text-5xl text-blue-300" />
              </div>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-gray-700 mt-6">
                No Resources Found
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 mt-2 text-center max-w-md">
                We couldn't find any PDFs, papers, or syllabus matching your
                search.
              </p>

              {/* OPTIONAL BUTTON */}
              <button
                onClick={() => setSearch("")}
                className="
          mt-5
          px-5 py-3
          rounded-2xl
          bg-blue-500
          hover:bg-blue-700
          text-white
          transition-all duration-300
        "
              >
                Clear Search
              </button>
            </div>
          ) : (
            currentData.map((item) => (
              <div key={item.id} className="h-[260px] flex flex-col">
                <div
                  className="
                    h-full
                    bg-white
                    border border-blue-100
                    rounded-3xl
                    p-5
                    shadow-sm
                    hover:shadow-lg
                    hover:-translate-y-1
                    transition-all duration-300
                    flex flex-col
                  "
                >
                  {/* Top Section */}
                  <div className="flex gap-4">
                    {/* PDF ICON */}
                    <div
                      className="
                        w-16 h-16
                        rounded-2xl
                        bg-blue-100
                        flex items-center justify-center
                        flex-shrink-0
                      "
                    >
                      {activeTab === "paper" ? (
                        <FaFileAlt className="text-3xl text-green-600" />
                      ) : activeTab === "Syllabus" ? (
                        <FaBook className="text-3xl text-purple-600" />
                      ) : (
                        <FaFilePdf className="text-3xl text-blue-600" />
                      )}
                    </div>

                    {/* TITLE */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="
                        text-gray-800
                        font-semibold
                        text-base
                        leading-6
                        line-clamp-2
                        min-h-[48px]
                      "
                      >
                        {item.title || item.subject_name || "Untitled"}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="mt-auto pt-1 flex justify-between items-end">
                    {/* Semester + Branch */}
                    <div className="flex flex-col gap-2">
                      {item.semester_name && (
                        <span
                          className="
                            bg-blue-50
                            text-blue-600
                            text-xs
                            font-medium
                            px-3 py-1
                            rounded-full
                            w-fit
                          "
                        >
                          {item.semester_name}
                        </span>
                      )}

                      {item.branch_name && (
                        <span
                          className="
                            bg-purple-50
                            text-purple-600
                            text-xs
                            font-medium
                            px-3 py-1
                            rounded-full
                            w-fit
                          "
                        >
                          {item.branch_name}
                        </span>
                      )}
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() =>
                        window.open(item.pdf_url || item.paper_url, "_blank")
                      }
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-blue-50
                        hover:bg-blue-600
                        group
                        flex items-center justify-center
                        transition-all duration-300
                        shadow-sm
                      "
                    >
                      <FaDownload
                        className="
                        text-blue-600
                        group-hover:text-white
                        transition-all duration-300
                      "
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* PAGINATION */}
        {filteredData.length > 0 && (
          <div
            className="
      
            left-0
            bg-white/90
            backdrop-blur-md
            border-t
            border-blue-100
            mt-6
            py-4
            flex
            justify-center
            items-center
            gap-2
            z-50
          "
          >
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="
        px-4 py-2
        rounded-lg
        border
        bg-white
        disabled:opacity-40
      "
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
            w-10 h-10
            rounded-lg
            border
            text-sm

            ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }
          `}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="
        px-4 py-2
        rounded-lg
        border
        bg-white
        disabled:opacity-40
      "
            >
              Next
            </button>
          </div>
        )}
        {/* FEEDBACK MODAL */}
        {openFeedback && (
          <div
            className="
              fixed inset-0
              bg-black/40
              flex items-center justify-center
              z-50
              p-4
            "
          >
            <div
              className="
                bg-white
                w-full
                max-w-md
                rounded-3xl
                p-6
                shadow-xl
              "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
                  <FaCommentDots className="text-3xl" /> Feedback
                </h2>

                <button
                  onClick={() => setOpenFeedback(false)}
                  className="text-gray-400 hover:text-red-500 text-xl"
                >
                  <IoClose size={25} />
                </button>
              </div>

              {/* RATING */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Rating</p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-2xl"
                    >
                      {star <= rating ? (
                        <FaStar className="text-yellow-400" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Description
                </p>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your feedback..."
                  className="
                    w-full
                    border border-gray-200
                    rounded-2xl
                    p-4
                    outline-none
                    resize-none
                    focus:border-blue-400
                    text-sm
                  "
                />
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpenFeedback(false)}
                  className="
                    px-5 py-2
                    rounded-xl
                    border
                    text-gray-600
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    sendFeedBack();
                  }}
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                  "
                >
                  {isLoading ? (
                    <BeatLoader size={10} color="#ffffff" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

export default StdDashboard;
