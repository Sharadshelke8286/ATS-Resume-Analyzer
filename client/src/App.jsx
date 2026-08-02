import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import Result from "./pages/Result";
import Builder from "./pages/Builder";
import Preview from "./pages/Preview";

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/analyze" element={<PrivateRoute><Analyze /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/result/:id" element={<PrivateRoute><Result /></PrivateRoute>} />

      {/* ✅ NEW: Builder routes — protected + before the * catch-all */}
      <Route path="/builder" element={<PrivateRoute><Builder /></PrivateRoute>} />
      <Route path="/preview" element={<PrivateRoute><Preview /></PrivateRoute>} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}