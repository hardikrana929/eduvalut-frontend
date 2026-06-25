import { useEffect, useState } from "react";
import { FaRegEdit, FaDownload, FaFilePdf } from "react-icons/fa";
import {jwtDecode} from 'jwt-decode';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { SkeletonCard } from "../SkeletonCard";
import { BeatLoader } from "react-spinners";
const ManageSyllabus = () => {
  // MODAL
  const [openModal, setOpenModal] = useState(false);
  // SEARCH + FILTER
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [pdfLoading, setPdfLoading] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfList, setPdfList] = useState([]);
  const itemsPerPage = 8;

  // FILTER DATA
  const filteredData = pdfList.filter((pdf) => {
    const matchesSearch = (pdf.title || "")
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
  // PAGINATION
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [title, setTitle] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [pdf, setPdf] = useState("");
  const [syllabusType, setSyllabusType] = useState("");
  
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
    setTitle("");
    setSemesterId("");
    setBranchId("");
    setUploadedBy("");
    setPdf("");
    setOpenModal(false);
    // setSyllabusType("");
    getPdfData();
  };
  //Add Pdfs
  const addPdfs = async (e) => {
    e.preventDefault();
    if (pdf.size > 2 * 1024 * 1024) {
      toast.error("PDF size must be under 2MB.", {
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

    if (pdf.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.", {
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
      if (!title || !semesterId || !branchId || !pdf) {
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
        formData.append("title", title);
        formData.append("semesterId", semesterId);
        formData.append("branchId", branchId);
        formData.append("uploadedBy", decoded.id);
        formData.append("pdfs", pdf);
        formData.append("syllabusType", "Syllabus");

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        if (syllabusType === "Syllabus") {
          toast.error("Only Material is Allowe", {
            duration: 3000,
            position: "top-center",
            style: {
              border: "1px solid #713200",
              padding: "10px",
              color: "#713200",
            },
          });
        } else {
          const result = await axios.post(
            "https://eduvalut-backend.vercel.app/api/pdf/addPdf",
            formData,
            options,
          );
          toast.success("Pdf added successfully.", {
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

  //Get Pdfs
  const getPdfData = async () => {
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

      const onlySyllabus = result.data.data.filter(
        (item) => item.syllabus_type === "Syllabus",
      );

      setPdfList(onlySyllabus);
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

  //Update Pdf
  const editMaterialPdf = (id) => {
    const singlePdf = pdfList.find((item) => item.id === id);

    if (!singlePdf) return;

    setTitle(singlePdf.title || "");
    setSemesterId(singlePdf.semester_id || "");
    setBranchId(singlePdf.branch_id || "");
    setSyllabusType(singlePdf.syllabus_type || "Material");
    setUploadedBy(singlePdf.uploaded_by || "");

    setEditId(id);
    setIsEdit(true);
    setOpenModal(true);
  };
  const updatePdf = async (e) => {
    e.preventDefault();

    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("semesterId", semesterId);
      formData.append("branchId", branchId);
      formData.append("uploadedBy", decoded.id);
      formData.append("syllabusType", syllabusType);

      if (pdf) {
        formData.append("pdf", pdf);
      }
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.put(
        `https://eduvalut-backend.vercel.app/api/pdf/updatePdf/${editId}`,
        formData,
        options,
      );

      toast.success("PDF updated successfully");

      clearFields();

      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setUploadLoading(false);
    }
  };

  //Delete Pdfs
  const deleteMaterialPdf = async (id) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let sure = confirm("Are you sure you went to delete.");
      if (sure) {
        await axios.delete(
          `https://eduvalut-backend.vercel.app/api/pdf/deletePdf/${id}`,
          options,
        );
        toast.success("Pdf Deleted successfully.");
        getPdfData();
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
    getPdfData();
    getBranchData();
    getSemesterData();
  }, []);
  return (
    <div className="min-h-screen pb-28">
      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Total PDFs {filteredData.length}
          </h1>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setEditId(null);
            setTitle("");
            setSemesterId("");
            setBranchId("");
            setUploadedBy("");
            setPdf("");
            setSyllabusType("");
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
            <FaPlus /> Add PDF
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

      {/* PDF CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {pdfLoading ? (
          [...Array(9)].map((_, index) => <SkeletonCard key={index} />)
        ) : currentData.length > 0 ? (
          currentData.map((pdf) => (
            <div
              key={pdf.id}
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
                      {pdf.title || pdf.subject_name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded by {pdf.fullname}
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
                  {pdf.semester_name}
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
                  {pdf.branch_name}
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
                  {pdf.syllabus_type}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-3">
                {/* EDIT */}
                <button
                  onClick={() => editMaterialPdf(pdf.id)}
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
                  onClick={() => deleteMaterialPdf(pdf.id)}
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
                  onClick={() => window.open(pdf.pdf_url, "_blank")}
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
              No PDFs Found
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              No PDFs match your search or filter.
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
                <h2 className="text-2xl font-bold text-gray-800">Add PDF</h2>

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
              onSubmit={isEdit ? updatePdf : addPdfs}
            >
              {/* TITLE */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter PDF title"
                  className="
                    w-full mt-2
                    border border-blue-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                  "
                />
              </div>

              {/* GRID */}
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

                {/* SEM */}
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

              {/* UPLOADER */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Uploaded By
                </label>

                <input
                  type="text"
                  value={decoded.id}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Uploaded by"
                  className="
                    w-full mt-2
                    border border-blue-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    
                  "
                  disabled
                />
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

                    {/* <p className="text-xs text-gray-400 mt-3">
                      Only PDF files • Max size 2MB
                    </p> */}

                    {pdf && (
                      <div className="mt-4 px-4 py-2 bg-white border rounded-xl shadow-sm">
                        <p className="text-sm font-medium text-blue-600 truncate max-w-[220px]">
                          {pdf.name}
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    id="pdfUpload"
                    type="file"
                    name="pdfs"
                    accept=".pdf"
                    onChange={(e) => setPdf(e.target.files[0])}
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
                  "
                >
                  {uploadLoading ? (
                    <BeatLoader size={10} color="#ffffff" />
                  ) : isEdit ? (
                    "Update PDF"
                  ) : (
                    "Upload PDF"
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

export default ManageSyllabus;
