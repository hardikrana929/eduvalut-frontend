import Testimonials from "./Testimonial";
import WhyChoose from "./WhyChoose";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
// import { useEffect } from "react";
const Heropage = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const userStr = localStorage.getItem("user");
  //   if (userStr) {
  //     try {
  //       const getUser = JSON.parse(userStr);

  //       // If already logged in, send them straight to their dashboard
  //       if (getUser && getUser.role === "student") {
  //         navigate("/stdDash", { replace: true });
  //       } else if (getUser && getUser.role === "admin") {
  //         navigate("/adminDash", { replace: true });
  //       }
  //     } catch (error) {
  //       // If localStorage data is broken, clear it
  //       localStorage.removeItem("user");
  //     }
  //   }
  // }, [navigate]);
  return (
    <>
      <Navbar />
      <section className="w-full mt-10 min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              Trusted by Students for Academic Resources
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Find Syllabus,
              <span className="text-blue-600"> Previous Papers </span>& Study
              Materials Easily
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Access semester-wise syllabus PDFs, previous exam papers, and
              important academic resources in one organized platform. Built to
              help students learn smarter and faster.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white px-6 py-3 rounded-lg font-medium shadow-md">
                Explore Resources
              </button>

              <Link
                to="/login"
                className="border text-center border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-gray-700 px-6 py-3 rounded-lg font-medium"
              >
                Student Login
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-500 text-sm">PDF Resources</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p className="text-gray-500 text-sm">Students</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                <p className="text-gray-500 text-sm">Question Papers</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Students Learning"
              className="w-full max-w-lg rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>
      <WhyChoose />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Heropage;
