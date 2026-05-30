import {
  FaBookOpen,
  FaFilePdf,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <FaBookOpen />,
      title: "Easy Syllabus Access",
      desc: "Get semester-wise syllabus PDFs quickly without searching multiple websites.",
    },
    {
      id: 2,
      icon: <FaFilePdf />,
      title: "Previous Papers",
      desc: "Download previous year papers and prepare better for exams.",
    },
    {
      id: 3,
      icon: <FaSearch />,
      title: "Smart Search",
      desc: "Find subjects and resources easily with clean filters.",
    },
    {
      id: 4,
      icon: <FaUsers />,
      title: "Student Friendly",
      desc: "Simple and clean interface specially designed for students.",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose
            <span className="text-blue-600"> EduVault?</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Everything students need in one organized and modern platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mt-6 text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;