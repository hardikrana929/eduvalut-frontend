import "./App.css";
import Heropage from "./component/Heropage";
import Signup from "./component/Signup";
import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./component/ForgotPassword";
import VerifyOtp from "./component/VerifyOtp";
import NewPassword from "./component/NewPassword";
import { Toaster } from "react-hot-toast";
import StdDashboard from "./component/StdDashboard";
import AdminDashboard from "./component/AdminDashboard";
import { ProtectedRouter, AuthAccess } from "./component/ProtectedRouter";
import ManageFeedback from "./component/admin/ManageFeedback";
import ManagePaper from "./component/admin/ManagePaper";
import ManagePdf from "./component/admin/ManagePdf";
import ManageSyllabus from "./component/admin/ManageSyllabus";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Heropage />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/newPassword" element={<NewPassword />} />
        {/* <Route
          path="/verifyotp"
          element={
            <AuthAccess>
              <VerifyOtp />
            </AuthAccess>
          }
        />
        <Route
          path="/newPassword"
          element={
            <AuthAccess>
              <NewPassword />
            </AuthAccess>
          }
        /> */}
        <Route
          path="/feedback"
          element={
            <AuthAccess>
              <ManageFeedback />
            </AuthAccess>
          }
        />
        <Route
          path="/paper"
          element={
            <AuthAccess>
              <ManagePaper />
            </AuthAccess>
          }
        />
        <Route
          path="/pdf"
          element={
            <AuthAccess>
              <ManagePdf />
            </AuthAccess>
          }
        />
        <Route
          path="/syllabus"
          element={
            <AuthAccess>
              <ManageSyllabus />
            </AuthAccess>
          }
        />

        <Route
          path="/stdDash"
          element={
            <ProtectedRouter role="student">
              <StdDashboard />
            </ProtectedRouter>
          }
        />
        <Route
          path="/adminDash"
          element={
            <ProtectedRouter role="admin">
              <AdminDashboard />
            </ProtectedRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
