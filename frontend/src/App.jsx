import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import { loginUser } from "./redux/slices/authSlice";
import AppRoutes from "./routes/routes";
import API from "./utils/api";

function App() {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const checkAuth = async () => {
    try {
      const response = await API.get("/auth/me");
      if (response.status === 200) {
        const user = response.data;
        dispatch(loginUser({ user }));
      }
    } catch (error) {
      console.error(error);
      toast.error("Session expired or Invalid token", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    } finally {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [dispatch]);

  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large"></Spin>
      </div>
    );
  }
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
