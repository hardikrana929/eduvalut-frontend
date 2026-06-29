// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export const ProtectedRouter = ({ children, authAccess }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   let decoded;

//   try {
//     decoded = jwtDecode(token);
//   } catch (error) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

//   const role = decoded.role;

//   if (authAccess && role !== authAccess) {
//     return (
//       <Navigate to={role === "admin" ? "/adminDash" : "/stdDash"} replace />
//     );
//   }

//   return children;
// };

// export const AuthRouter = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     jwtDecode(token);
//   } catch (error) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };
// import { Navigate } from "react-router-dom";

// export const ProtectedRouter = ({ children, authAccess }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (authAccess && user.role !== authAccess) {
//     return (
//       <Navigate
//         to={user.role === "admin" ? "/adminDash" : "/stdDash"}
//         replace
//       />
//     );
//   }

//   return children;
// };

// export const AuthRouter = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// };
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRouter = ({ children, authAccess }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Verifying session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (authAccess && user.role !== authAccess) {
    return (
      <Navigate
        to={user.role === "admin" ? "/adminDash" : "/stdDash"}
        replace
      />
    );
  }

  return children;
};

export const AuthRouter = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Verifying session...
        </p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};
