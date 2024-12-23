import { Link } from "react-router-dom";
import BlogPostCard from "../components/Cards/BlogPostCard";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPlusCircle } from "react-icons/fa";
import CEBlogPostModal from "../components/Modal/CEBlogPostModal";
import { useBlogStore } from "../store/BlogStore";
import moment from "moment";
import { useAuthStore } from "../store/AuthStore";
import { BACKEND_URL, detectedLanguage } from "../utils";
import { useLanguage } from "../store/LanguageStore";
import { BiSolidBookContent } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";

const Blog = () => {
  const [showCEModal, setShowCEModal] = useState(false);
  const { getBlogs, blogs, setBlogs } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [loadingShowMore, setLoadingShowMore] = useState(false);

  const handleClickLoadMoreButton = async () => {
    try {
      setLoadingShowMore(true);
      const response = await axios.get(
        `${BACKEND_URL}/api/blogs?skip=${blogs.length}`
      );
      setBlogs([...blogs, ...response.data.contents]);
      setLoadingShowMore(false);
      if (response.data.contents.length > 9) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrongs");
      setLoadingShowMore(false);
    }
  };

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await getBlogs();
      if (blogs.length > 9) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
      if (blogs) setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 p-4">
        {showCEModal && (
          <CEBlogPostModal onClose={() => setShowCEModal(false)} />
        )}
        <div className="container mx-auto mb-5">
          <div className="mt-20">
            <h3 className="font-semibold text-slate-700 flex gap-2 w-full items-center">
              <Link to={"/"} className="flex items-center gap-2">
                <FaHome /> {translate.home}
              </Link>
              <IoIosArrowForward className="mt-1" />
              <Link to={"/blogs"}>{translate.blogs}</Link>
            </h3>
            <div className="flex justify-between items-center mr-5">
              <h1 className="mt-4 text-xl font-bold text-slate-700">
                {translate["ourStories&Activities"]}
              </h1>
              {/**admin only allow */}
              {user?.role === "admin" && (
                <button onClick={() => setShowCEModal(true)}>
                  <FaPlusCircle className="size-8 text-blue-400" />
                </button>
              )}
            </div>
            {isLoading ? (
              <div className="mt-5 max-h-[500px]  h-full overflow-y-auto flex flex-col py-10 items-center gap-10 max-w-lg mx-auto ">
                {[...new Array(3)].map((_, idx) => (
                  <div
                    className="animate-pulse flex w-full gap-2 h-[600px] border p-2"
                    key={"loadingBlog+" + idx}
                  >
                    <div className="flex-[0.4] w-[150px] h-full p-4 bg-gray-200"></div>
                    <div className="flex-[0.6] flex-col ">
                      <div className="w-[90%] h-5 bg-gray-200 rounded" />
                      <div className="w-1/2 h-4 bg-gray-200 rounded mt-3" />
                      <div className="w-full h-9 bg-gray-200 rounded mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !isLoading && blogs?.length === 0 ? (
              <div className="flex justify-center items-center mt-5 max-h-[500px] h-full text-xl font-bold text-slate-500 w-full">
                <div className="flex flex-col gap-4 items-center mt-20 select-none">
                  <BiSolidBookContent className="size-20" />{" "}
                  <span>No Blog Post yet.</span>
                </div>
              </div>
            ) : (
              <div className="mt-5 max-h-[500px]  h-full overflow-y-auto flex flex-col justify-start py-10 items-center gap-10 ">
                {blogs?.map((blog, idx) => (
                  <BlogPostCard
                    key={"blog+" + idx}
                    img={blog.media[0].url}
                    title={
                      language === "English" ? blog.title_en : blog.title_mm
                    }
                    time={moment(blog.createdAt).fromNow()}
                    description={
                      language === "English"
                        ? blog.description_en
                        : blog.description_mm
                    }
                    videoUrl={blog.videoURL}
                    linkTo={"/blogs/" + blog._id}
                    data={blog}
                    translate={translate}
                  />
                ))}
                {showMoreButton && (
                  <button
                    className="px-4 py-2 border rounded font-semibold hover:bg-gray-200 disabled:opacity-80"
                    onClick={handleClickLoadMoreButton}
                    disabled={loadingShowMore}
                  >
                    {loadingShowMore ? "Loading..." : "Load More ..."}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Blog;
