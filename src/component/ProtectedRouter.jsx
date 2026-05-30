import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children, role }) => {
  const isUser = JSON.parse(localStorage.getItem("user"));
  if (!isUser) {
    return <Navigate to="/login" replace />;
  }

  // role check
  if (role && isUser.role !== role) {
    return (
      <Navigate
        to={isUser.role === "admin" ? "/adminDash" : "/stdDash"}
        replace
      />
    );
  }
  return children;
};

export const AuthAccess = ({ children }) => {
  const isUser = JSON.parse(localStorage.getItem("user"));
  if (!isUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};
