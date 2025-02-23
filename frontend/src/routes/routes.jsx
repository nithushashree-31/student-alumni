import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ForgotPassword from "../components/forgot-password/ForgotPassword";
import Login from "../components/Login/Login";
import Profile from "../components/profile/Profile";
import Signup from "../components/signup/Signup";
import UserManagement from "../components/user-management/UserManagement";
import WSHomePage from "../components/water-services/WSHome";
import DetailsPage from "../components/water-services/DetailsPage"; // Add this import
import WSRecordCreate from "../components/water-services/WSRecordCreate";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  return children;
};

const AppRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/app" /> : <AuthLayout />}
      >
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<></>} />

        {/* Water Service Routes */}
        <Route path="water-service/*" element={<Outlet />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<WSHomePage />} />
          <Route path=":id/details" element={<DetailsPage />} />{" "}
          <Route path="create" element={<WSRecordCreate />} />
          <Route
            path="*"
            element={<Navigate to="/app/water-service" replace />}
          />
        </Route>

        {/* Settings Routes */}
        <Route path="settings/*" element={<Outlet />}>
          <Route index element={<Navigate to="user-management" replace />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="*" element={<Navigate to="/app/settings" replace />} />
        </Route>
        <Route path="profile/*" element={<Outlet />}>
          <Route index element={<Navigate to="edit" replace />} />
          <Route path="edit" element={<Profile />} />
          <Route path="*" element={<Navigate to="/app/settings" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/app/home" replace />} />
      </Route>
      <Route path="/" element={<Navigate to="/app/home" replace />} />
      <Route path="*" element={"Not Found"} />
    </Routes>
  );
};

export default AppRoutes;
