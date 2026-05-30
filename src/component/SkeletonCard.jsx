export const SkeletonCard = () => {
  return (
    <div
      className="
        bg-white
        border border-blue-100
        rounded-3xl
        p-5
        animate-pulse
      "
    >
      <div className="flex gap-4">
        
        {/* ICON */}
        <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>

        {/* CONTENT */}
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          <div className="flex gap-2 mt-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>

            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end mt-5">
        <div className="w-11 h-11 rounded-xl bg-gray-200"></div>
      </div>
    </div>
  );
};

