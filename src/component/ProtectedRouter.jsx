// import { Navigate } from "react-router-dom";

// export const ProtectedRouter = ({ children, role }) => {
//   const isUser = JSON.parse(localStorage.getItem("user"));
//   if (!isUser) {
//     return <Navigate to="/login" replace />;
//   }

//   // role check
//   if (role && isUser.role !== role) {
//     return (
//       <Navigate
//         to={isUser.role === "admin" ? "/adminDash" : "/stdDash"}
//         replace
//       />
//     );
//   }
//   return children;
// };

// export const AuthAccess = ({ children }) => {
//   const isUser = JSON.parse(localStorage.getItem("user"));
//   if (!isUser) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({
  children,
  role,
}) => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "admin"
            ? "/adminDash"
            : "/stdDash"
        }
        replace
      />
    );
  }

  return children;
};