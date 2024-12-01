import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import VerifyEmail from "./pages/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store/AuthStore";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import SendForgotEmailSuccess from "./pages/SendForgotEmailSuccess";
import ResetPassword from "./pages/ResetPassword";
import Blog from "./pages/Blog";
import EducationProjects from "./pages/EducationProjects";
import Events from "./pages/Events";
import BlogPostDetails from "./pages/BlogPostDetails";
import EventDetails from "./pages/EventDetails";
import ProjectPostDetails from "./pages/ProjectPostDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminHome from "./pages/Admin/AdminHome";
import { useHomeStore } from "./store/HomeStore";
import AdminEventPostList from "./pages/Admin/AdminEventPostList";
import Playground from "./playground/Playground";
import AdminBlogs from "./pages/Admin/AdminBlogs";
import { useBlogStore } from "./store/BlogStore";
import AdminProjects from "./pages/Admin/AdminProjects";
import { useEduProjectStore } from "./store/EduProjectStore";
import LoadingPage from "./pages/LoadingPage";
import AdminStaffsPage from "./pages/Admin/AdminStaffsPage";
import AdminPartnershipsPage from "./pages/Admin/AdminPartnershipsPage";
import { usePartnershipsStore } from "./store/PartnershipsStore";
import AdminPrivacyPolicy from "./pages/Admin/AdminPrivacyPolicy";
import { usePrivacyStore } from "./store/PrivacyStore";
import DonationPage from "./pages/DonationPage";
import Error500Page from "./pages/Error500Page";
import Error404Page from "./pages/Error404Page";
import { useLanguage } from "./store/LanguageStore";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  const { user, fetchUser } = useAuthStore();
  const { getHeader, getHomeInfo, header } = useHomeStore();
  const { getBlogs } = useBlogStore();
  const { projects, getAllProjects } = useEduProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const { getPartnerships } = usePartnershipsStore();
  const { getPrivacy } = usePrivacyStore();
  const navigate = useNavigate();
  const { getCurrentLanguage } = useLanguage();

  const updateFavicon = (favicon) => {
    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    link.type = "image/*";
    link.rel = "icon";
    link.href = favicon;
    document.getElementsByTagName("head")[0].appendChild(link);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", () => {
            navigator.serviceWorker
              .register("/service-worker.js")
              .then((registration) =>
                console.log("Service Worker registered:", registration)
              )
              .catch((err) =>
                console.error("Service Worker registration failed:", err)
              );
          });
        }
        setIsLoading(true);
        await fetchUser();
        await getHomeInfo();
        await getHeader();
        await getBlogs();
        await getPrivacy();
        await getPartnerships();
        getCurrentLanguage();
        setIsLoading(false);

        updateFavicon(header?.logo);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setIsLoading(false);
          navigate("/500error");
        }
        console.log(error);
      }
    };
    fetchData();
    Notification.requestPermission();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={user?.isVerified ? <Navigate to={"/"} /> : <Signup />}
            />
            <Route path="/500error" element={<Error500Page />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:id" element={<BlogPostDetails />} />
            <Route
              path={"/education-projects"}
              element={<EducationProjects />}
            />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/project/:id" element={<ProjectPostDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/verify"
              element={
                user?.isVerified ? <Navigate to={"/"} /> : <VerifyEmail />
              }
            />
            <Route
              path="/login"
              element={user?.isVerified ? <Navigate to={"/"} /> : <Login />}
            />
            <Route path="/help" element={<DonationPage />} />
            <Route
              path="/forgotPassword"
              element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
            />
            <Route
              path="/successForgotPassword"
              element={
                user ? <Navigate to={"/"} /> : <SendForgotEmailSuccess />
              }
            />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

            {/** Admin Dashboard */}

            <Route
              path="/admin/dashboard/"
              element={
                user?.role === "admin" ? <AdminHome /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/admin/dashboard/eventLists"
              element={
                user?.role === "admin" ? (
                  <AdminEventPostList />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />

            <Route
              path="/admin/dashboard/blogs"
              element={
                user?.role === "admin" ? <AdminBlogs /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/admin/dashboard/projects"
              element={
                user?.role === "admin" ? (
                  <AdminProjects />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />

            <Route
              path="/admin/dashboard/staffs"
              element={
                user?.role === "admin" ? (
                  <AdminStaffsPage />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/admin/dashboard/partnerships"
              element={
                user?.role === "admin" ? (
                  <AdminPartnershipsPage />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="/admin/dashboard/users"
              element={
                user?.role === "admin" ? <AdminUsers /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="/admin/dashboard/privacy-policy"
              element={
                user?.role === "admin" ? (
                  <AdminPrivacyPolicy />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route path="/*" element={<Error404Page />} />
          </Routes>

          <ToastContainer position="top-center" />
        </>
      )}
    </>
  );
}

export default App;
