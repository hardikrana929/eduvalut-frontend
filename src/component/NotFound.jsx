const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-gray-600 mt-2">Page Not Found</p>

      <a
        href="/"
        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;