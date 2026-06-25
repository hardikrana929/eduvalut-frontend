import { useEffect, useState } from "react";
import { FaRegEdit, FaDownload, FaFilePdf } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SkeletonCard } from "../SkeletonCard";
import { BeatLoader } from "react-spinners";
const ManagePaper = () => {
  // MODAL
  const [openModal, setOpenModal] = useState(false);
  // SEARCH + FILTER
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [paperLoading, setpaperLoading] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [paperList, setpaperList] = useState([]);
  const itemsPerPage = 8;

  // FILTER DATA
  const filteredData = paperList.filter((paper) => {
    const matchesSearch = (paper.subject_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesBranch = branchFilter
      ? String(paper.branch_id) === String(branchFilter)
      : true;

    const matchesSemester = semesterFilter
      ? String(paper.semester_id) === String(semesterFilter)
      : true;

    const matchesYear = yearFilter
      ? String(paper.year) === String(yearFilter)
      : true;

    return matchesSearch && matchesBranch && matchesSemester && matchesYear;
  });
  // PAGINATION
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [year, setYear] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [paper, setpaper] = useState("");

  const token = localStorage.getItem("token");
  let decoded = "?";
  if (token) {
    try {
      decoded = jwtDecode(token);
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
  }
  //Clear Fields
  const clearFields = () => {
    setSubjectName("");
    setSemesterId("");
    setBranchId("");
    setUploadedBy("");
    setpaper("");
    setOpenModal(false);
    setYear("");
    getpaperData();
  };
  //Add papers
  const addpapers = async (e) => {
    e.preventDefault();
    //Check Paper size
    if (paper.size > 2 * 1024 * 1024) {
      toast.error("paper size must be under 2MB.", {
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
    //Check file type
    if (paper.type !== "application/pdf") {
      toast.error("Only paper files are allowed.", {
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
      if (!subjectName || !year || !semesterId || !branchId || !paper) {
        toast.error("All fields are require.", {
          duration: 3000,
          position: "top-center",
          style: {
            border: "1px solid #713200",
            padding: "10px",
            color: "#713200",
          },
        });
      } else {
        setUploadLoading(true);
        const formData = new FormData();
        formData.append("subjectName", subjectName);
        formData.append("semesterId", semesterId);
        formData.append("branchId", branchId);
        formData.append("uploadedBy", decoded.id);
        formData.append("pdfs", paper);
        formData.append("year", year);

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const result = await axios.post(
          "https://eduvalut-backend.vercel.app/api/paper/addPaper",
          formData,
          options,
        );
        toast.success("Paper added successfully.", {
          duration: 3000,
          position: "top-center",
          style: {
            border: "1px solid #713200",
            padding: "10px",
            color: "#713200",
          },
        });
        clearFields();
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
    } finally {
      setUploadLoading(false);
    }
  };

  //Get papers
  const getpaperData = async () => {
    try {
      setpaperLoading(true);

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        "https://eduvalut-backend.vercel.app/api/paper/getPaper",
        options,
      );
      setpaperList(result.data.data);
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
      setpaperLoading(false);
    }
  };

  //Update paper
  const editMaterialpaper = (id) => {
    const singlepaper = paperList.find((item) => item.id === id);

    if (!singlepaper) return;

    setSubjectName(singlepaper.subject_name || "");
    setSemesterId(singlepaper.semester_id || "");
    setBranchId(singlepaper.branch_id || "");
    setYear(singlepaper.year || "");
    setUploadedBy(singlepaper.uploaded_by || "");
    setpaper(singlepaper.pdf_url || "");

    setEditId(id);
    setIsEdit(true);
    setOpenModal(true);
  };
  const updatepaper = async (e) => {
    e.preventDefault();

    try {
      setUploadLoading(true);

      const data = {
        subjectName,
        semesterId,
        branchId,
        uploadedBy: decoded.id,
        year,
        paper,
      };

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `https://eduvalut-backend.vercel.app/api/paper/updatePaper/${editId}`,
        data,
        options,
      );

      toast.success("Paper updated successfully");

      clearFields();

      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setUploadLoading(false);
    }
  };

  //Delete papers
  const deleteMaterialpaper = async (id) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let sure = confirm("Are you sure you went to delete.");
      if (sure) {
        await axios.delete(
          `https://eduvalut-backend.vercel.app/api/paper/deletePaper/${id}`,
          options,
        );
        toast.success("paper Deleted successfully.");
        getpaperData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Server Error...");
    }
  };

  //GET Branch
  const getBranchData = async () => {
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
      toast.error(error.response?.data?.message || "Opps! Server Error...");
    }
  };

  //GET Semester
  const getSemesterData = async () => {
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
  };
  useEffect(() => {
    getpaperData();
    getBranchData();
    getSemesterData();
  }, []);
  return (
    <div className="min-h-screen pb-28">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Total papers {filteredData.length}
          </h1>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setEditId(null);
            setSubjectName("");
            setSemesterId("");
            setBranchId("");
            setUploadedBy("");
            setpaper("");
            setYear("");
            setOpenModal(true);
          }}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4 py-3
            rounded-2xl
            transition-all duration-300
            font-semibold
          "
        >
          <p className="flex justify-center items-center gap-2">
            <FaPlus /> Add paper
          </p>
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        {/* SEARCH */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search papers..."
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

        {/* YEAR FILTER */}
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
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
          <option value="">All Years</option>

          {Array.from(
            { length: new Date().getFullYear() - 2023 + 1 },
            (_, i) => {
              const startYear = 2023;
              const yearValue = startYear + i;

              return (
                <option key={yearValue} value={yearValue}>
                  {yearValue}
                </option>
              );
            },
          )}
        </select>
      </div>

      {/* paper CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {paperLoading ? (
          [...Array(9)].map((_, index) => <SkeletonCard key={index} />)
        ) : currentData.length > 0 ? (
          currentData.map((paper) => (
            <div
              key={paper.id}
              className="
                bg-white
                border border-blue-100
                rounded-3xl
                p-5
                shadow-sm
                hover:shadow-md
                transition-all duration-300
              "
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {/* ICON */}
                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-blue-100
                      flex items-center justify-center
                    "
                  >
                    <FaFilePdf className="text-2xl text-blue-600" />
                  </div>

                  {/* TITLE */}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {paper.title || paper.subject_name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded by {paper.fullname}
                    </p>
                  </div>
                </div>
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className="
                    bg-blue-50
                    text-blue-600
                    px-3 py-1
                    rounded-full
                    text-xs
                  "
                >
                  {paper.semester_name}
                </span>

                <span
                  className="
                    bg-purple-50
                    text-purple-600
                    px-3 py-1
                    rounded-full
                    text-xs
                  "
                >
                  {paper.branch_name}
                </span>

                <span
                  className="
                    bg-green-50
                    text-green-600
                    px-3 py-1
                    rounded-full
                    text-xs
                  "
                >
                  {paper.year}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-3">
                {/* EDIT */}
                <button
                  onClick={() => {
                    editMaterialpaper(paper.id);
                  }}
                  className="
                    flex-1
                    bg-green-100
                    cursor-pointer
                    hover:bg-green-200
                    text-green-600
                    py-3                    
                    rounded-2xl
                    flex items-center justify-center gap-2
                    transition-all
                  "
                >
                  <FaRegEdit />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => deleteMaterialpaper(paper.id)}
                  className="
                    flex-1
                    bg-red-100
                    cursor-pointer
                    hover:bg-red-200
                    text-red-600
                    py-3
                    rounded-2xl
                    flex items-center justify-center gap-2
                    transition-all
                  "
                >
                  <FaRegTrashCan />
                </button>

                {/* DOWNLOAD */}
                <button
                  onClick={() => window.open(paper.pdf_url, "_blank")}
                  className="
                  cursor-pointer
                    flex-1
                    bg-blue-100
                    hover:bg-blue-200
                    text-blue-600
                    py-3
                    rounded-2xl
                    flex items-center justify-center
                    transition-all
                  "
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
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

            <h2 className="text-2xl font-bold text-gray-700 mt-6">
              No papers Found
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              No papers match your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {/* SIMPLE CENTER PAGINATION */}
      {filteredData.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="
        px-4 py-2
        rounded-xl
        border border-blue-100
        bg-white
        hover:bg-blue-50
        text-gray-700
        transition-all duration-300
        disabled:opacity-40
        disabled:cursor-not-allowed
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
            rounded-xl
            transition-all duration-300
            font-medium

            ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-blue-100 text-gray-700 hover:bg-blue-50"
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
        rounded-xl
        border border-blue-100
        bg-white
        hover:bg-blue-50
        text-gray-700
        transition-all duration-300
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
          >
            Next
          </button>
        </div>
      )}

      {/* MODAL */}
      {openModal && (
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
              rounded-3xl
              w-full
              max-w-2xl
              p-6
              shadow-2xl
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Add paper</h2>

                <p className="text-gray-500 text-sm mt-1">
                  Upload new study material
                </p>
              </div>

              <button
                onClick={() => setOpenModal(false)}
                className="
                flex
                justify-center items-center
                cursor-pointer
                  w-10 h-10
                  rounded-xl
                  bg-red-50
                  text-red-500                  
                "
              >
                <IoClose size={25} />
              </button>
            </div>

            {/* FORM */}
            <form
              className="mt-6 space-y-5"
              onSubmit={isEdit ? updatepaper : addpapers}
            >
              {/* SUBJECT NAME */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Subject Name
                </label>

                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Enter subject name"
                  className="
                    w-full mt-2
                    border border-blue-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                  "
                />
              </div>

              {/* BRANCH + SEMESTER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* BRANCH */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Branch
                  </label>

                  <select
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="
                      w-full mt-2
                      border border-blue-100
                      rounded-2xl
                      px-4 py-3
                      outline-none
                    "
                  >
                    <option value="">Select Branch</option>

                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SEMESTER */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Semester
                  </label>

                  <select
                    value={semesterId}
                    onChange={(e) => setSemesterId(e.target.value)}
                    className="
                      w-full mt-2
                      border border-blue-100
                      rounded-2xl
                      px-4 py-3
                      outline-none
                    "
                  >
                    <option value="">Select Semester</option>

                    {semesters.map((sem) => (
                      <option key={sem.id} value={sem.id}>
                        {sem.semester_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* YEAR + UPLOADED BY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* YEAR */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Year
                  </label>

                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="
                      w-full mt-2
                      border border-blue-100
                      rounded-2xl
                      px-4 py-3
                      outline-none
                    "
                  >
                    <option value="">Select Year</option>

                    {Array.from(
                      { length: new Date().getFullYear() - 2023 + 1 },
                      (_, i) => {
                        const startYear = 2023;
                        const yearValue = startYear + i;

                        return (
                          <option key={yearValue} value={yearValue}>
                            {yearValue}
                          </option>
                        );
                      },
                    )}
                  </select>
                </div>

                {/* UPLOADED BY */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Uploaded By
                  </label>

                  <input
                    type="text"
                    value={decoded.id}
                    placeholder="Uploaded by"
                    className="
                      w-full mt-2
                      border border-blue-100
                      rounded-2xl
                      px-4 py-3
                      outline-none
                      bg-gray-50
                      cursor-not-allowed
                    "
                    disabled
                  />
                </div>
              </div>

              {/* FILE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload PDF
                </label>

                <label
                  htmlFor="pdfUpload"
                  className="
                    flex flex-col items-center justify-center
                    w-full px-6 py-5
                    border-2 border-dashed border-blue-300
                    rounded-2xl
                    bg-gradient-to-br from-blue-50 to-white
                    cursor-pointer
                    transition-all duration-300
                    hover:border-blue-500
                    hover:bg-blue-50
                    hover:shadow-md
                  "
                >
                  <div className="flex flex-col items-center text-center">
                    <FaFilePdf className="text-4xl text-red-500 mb-3" />

                    <p className="text-base font-semibold text-gray-700">
                      Click to upload PDF
                    </p>

                    {paper && (
                      <div className="mt-4 px-4 py-2 bg-white border rounded-xl shadow-sm">
                        <p className="text-sm font-medium text-blue-600 truncate max-w-[220px]">
                          {paper.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    id="pdfUpload"
                    type="file"
                    name="pdfs"
                    accept=".pdf"
                    onChange={(e) => setpaper(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                <p className="text-red-500 text-sm mt-2 ml-1 font-medium">
                  * PDF size must be under 2MB
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="
                    px-5 py-3
                    rounded-2xl
                    border
                    text-gray-600
                    cursor-pointer
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploadLoading}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6 py-3
                    rounded-2xl
                    min-w-[140px]
                    flex justify-center items-center
                    disabled:opacity-70
                    cursor-pointer
                  "
                >
                  {uploadLoading ? (
                    <BeatLoader size={10} color="#ffffff" />
                  ) : isEdit ? (
                    "Update Paper"
                  ) : (
                    "Upload Paper"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePaper;
