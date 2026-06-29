import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaStar } from "react-icons/fa";
import { SkeletonCard } from "../SkeletonCard";

const MangeFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  // DELETE FEEDBACK
  const deleteFeedback = async (id) => {
    try {
      // const options = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      let sure = confirm("Are you sure you went to delete.");
      if (sure) {
        const deleteData = await axios.delete(
          `https://eduvalut-backend.vercel.app/api/feedback/deleteFeedback/${id}`,
          { withCredentials: true },
        );
        toast.success(deleteData.data.message || "Feedback Deleted");
        setFeedbackList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error...");
    }
  };

  // GET FEEDBACK
  const getFeedback = async () => {
    try {
      setLoading(true);

      // const options = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      const getData = await axios.get(
        "https://eduvalut-backend.vercel.app/api/feedback/getFeedback",
        { withCredentials: true },
      );

      setFeedbackList(getData.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Opps! Server Error...", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-5">
      {loading ? (
        [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
      ) : feedbackList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbackList.map((feedback) => (
            <div
              key={feedback.id}
              className="
              bg-white
              border border-blue-100
              rounded-2xl
              p-4
              shadow-sm
              hover:shadow-md
              transition-all duration-300
            "
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-3">
                {/* USER */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                    w-11 h-11
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    flex items-center justify-center
                    font-bold
                  "
                  >
                    {feedback.fullname?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {feedback.fullname}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* RATING */}
                <div
                  className="
                  px-2.5 py-1
                  rounded-full
                  bg-yellow-50
                  text-yellow-600
                  text-xs sm:text-sm
                  font-semibold
                "
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        size={14}
                        className={
                          index < Number(feedback.rating)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <span>{feedback.rating}/5</span>
                </div>
              </div>

              {/* MESSAGE */}
              <div
                className="
                mt-4
                bg-gray-50
                border border-gray-100
                rounded-xl
                p-3
              "
              >
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                  {feedback.message}
                </p>
              </div>

              {/* ACTION */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => deleteFeedback(feedback.id)}
                  className="
                  w-9 h-9
                  rounded-xl
                  bg-red-50
                  hover:bg-red-100
                  text-red-500
                  flex items-center justify-center
                  transition-all duration-300
                "
                >
                  <FaTrash size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">No Feedback Found</div>
      )}
    </div>
  );
};
export default MangeFeedback;
