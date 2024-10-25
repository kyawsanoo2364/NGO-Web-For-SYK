import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import VerifyEmail from "./pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/AuthStore";
import Login from "./pages/Login";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import SendForgotEmailSuccess from "./pages/SendForgotEmailSuccess";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import EducationProjects from "./pages/EducationProjects";
import Events from "./pages/Events";

function App() {
  const { user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={user?.isVerified ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route path="/blogs" element={<Blog />} />
        <Route path={"/education-projects"} element={<EducationProjects />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/verify"
          element={user?.isVerified ? <Navigate to={"/"} /> : <VerifyEmail />}
        />
        <Route
          path="/login"
          element={user?.isVerified ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/forgotPassword"
          element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
        />
        <Route
          path="/successForgotPassword"
          element={user ? <Navigate to={"/"} /> : <SendForgotEmailSuccess />}
        />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
