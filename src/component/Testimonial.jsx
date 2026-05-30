import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
const reviews = [
  {
    id: 1,
    name: "Rahul Patel",
    role: "BCA Student",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    message:
      "EduVault helped me find previous papers easily before exams. The interface is clean and very simple to use.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "IT Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    message:
      "Very useful platform for students. Downloading syllabus PDFs and resources is fast and smooth.",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Engineering Student",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    message:
      "Everything is organized properly semester-wise. Best academic resource website for junior students.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "BSc IT Student",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    message:
      "I love the clean design and simple navigation. Very easy to find study materials.",
  },
  {
    id: 5,
    name: "Karan Mehta",
    role: "Computer Engineering",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    message:
      "Best platform for downloading syllabus PDFs and previous papers quickly.",
  },
  {
    id: 6,
    name: "Neha Joshi",
    role: "MCA Student",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    message:
      "The website is fast, responsive, and really useful during exam preparation.",
  },
  {
    id: 7,
    name: "Arjun Singh",
    role: "Diploma Student",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    message:
      "EduVault saves a lot of time. Everything is available in one place.",
  },
  {
    id: 8,
    name: "Pooja Shah",
    role: "BCA Student",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    message:
      "Very modern and student-friendly platform. Highly recommended for juniors.",
  },
  {
    id: 9,
    name: "Vikram Patel",
    role: "IT Engineering",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    message:
      "Easy access to academic resources with a beautiful and responsive UI.",
  },
];
const Testimonials = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Student
            <span className="text-blue-600"> Feedback</span>
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            See what students say about EduVault and their experience using the
            platform.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-14">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white p-7 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 h-full">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    {/* Profile */}
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                    />

                    {/* Name + Role */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.name}
                      </h3>

                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400 mt-5">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  {/* Feedback */}
                  <p className="text-gray-600 mt-5 leading-relaxed">
                    {review.message}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
