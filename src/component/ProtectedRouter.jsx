// import { Navigate } from "react-router-dom";

// export const ProtectedRouter = ({
//   children,
//   authAccess = [],
// }) => {
//   const token = localStorage.getItem("token");

//   const user = JSON.parse(
//     localStorage.getItem("user")
//   );

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if user's role is allowed
//   if (
//     authAccess.length > 0 &&
//     !authAccess.includes(user.role)
//   ) {
//     return (
//       <Navigate
//         to={
//           user.role === "admin"
//             ? "/adminDash"
//             : "/stdDash"
//         }
//         replace
//       />
//     );
//   }

//   return children;
// };
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({
  children,
  authAccess = [],
}) => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!token || !user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  if (
    authAccess.length > 0 &&
    !authAccess.includes(user.role)
  ) {
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