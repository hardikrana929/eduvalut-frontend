import "./App.css";
import Heropage from "./component/Heropage";
import Signup from "./component/Signup";
import Login from "./component/Login";
import NotFound from "./component/NotFound";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./component/ForgotPassword";
import VerifyOtp from "./component/VerifyOtp";
import NewPassword from "./component/NewPassword";
import { Toaster } from "react-hot-toast";
import StdDashboard from "./component/StdDashboard";
import AdminDashboard from "./component/AdminDashboard";
import { ProtectedRouter, AuthRouter} from "./component/ProtectedRouter";
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
        <Route path="*" element={<NotFound />} />
        {/* <Route
          path="/verifyotp"
          element={
            <ProtectedRouter authAccess={["admin", "student"]}>
              <VerifyOtp />
            </ProtectedRouter>
          }
        />
        <Route
          path="/newPassword"
          element={
            <ProtectedRouter authAccess={["admin", "student"]}>
              <NewPassword />
            </ProtectedRouter>
          }
        /> */}
        <Route
          path="/feedback"
          element={
            <AuthRouter>
              <ManageFeedback />
            </AuthRouter>
          }
        />
        <Route
          path="/paper"
          element={
            <AuthRouter>
              <ManagePaper />
            </AuthRouter>
          }
        />
        <Route
          path="/pdf"
          element={
            <AuthRouter>
              <ManagePdf />
            </AuthRouter>
          }
        />
        <Route
          path="/syllabus"
          element={
            <AuthRouter>
              <ManageSyllabus />
            </AuthRouter>
          }
        />

        <Route
          path="/stdDash"
          element={
            <ProtectedRouter authAccess="student">
              <StdDashboard />
            </ProtectedRouter>
          }
        />
        <Route
          path="/adminDash"
          element={
            <ProtectedRouter authAccess="admin">
              <AdminDashboard />
            </ProtectedRouter>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
