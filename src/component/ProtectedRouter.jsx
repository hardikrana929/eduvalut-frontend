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

// import { Navigate } from "react-router-dom";

// export const ProtectedRouter = ({ children, authAccess }) => {
//   const token = localStorage.getItem("token");

//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (authAccess && user?.role !== authAccess) {
//     return (
//       <Navigate
//         to={user?.role === "admin" ? "/adminDash" : "/stdDash"}
//         replace
//       />
//     );
//   }

//   return children;
// };

// export const AuthRouter = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRouter = ({ children, authAccess }) => {
  const token = localStorage.getItem("token");
  console.log(jwtDecode(token));
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let decoded;

  try {
    decoded = jwtDecode(token);
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  const role = decoded.role;

  if (authAccess && role !== authAccess) {
    return (
      <Navigate to={role === "admin" ? "/adminDash" : "/stdDash"} replace />
    );
  }

  return children;
};

export const AuthRouter = ({ children }) => {
  const token = localStorage.getItem("token");

  console.log(jwtDecode(token));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    jwtDecode(token);
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};
