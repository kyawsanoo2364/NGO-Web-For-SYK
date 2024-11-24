import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import BlogPostCard from "../Cards/BlogPostCard";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../../store/BlogStore";
import moment from "moment";
import { detectedLanguage } from "../../utils";
import { useLanguage } from "../../store/LanguageStore";

const LatestNewSection = () => {
  const scrollBlog = useRef();
  const { blogs } = useBlogStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  useEffect(() => {
    if (scrollBlog.current) {
      scrollBlog.current.scrollLeft = 0;
    }
  }, []);

  const handleNext = () => {
    scrollBlog.current.scrollBy({
      left: scrollBlog.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollBlog.current.scrollBy({
      left: -scrollBlog.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className=" my-10">
      <div className="container mx-auto relative">
        <div className="">
          <h1 className="flex gap-2 items-center text-2xl text-slate-800 font-bold ">
            {translate.latestNews}{" "}
            <IoIosArrowForward className="size-5 text-slate-800 " />{" "}
            <Link
              to={"/blogs"}
              className="text-lg font-normal text-blue-500 hover:underline"
            >
              {translate.viewAll}
            </Link>
          </h1>
          <div
            className="mt-5 flex flex-row  justify-start  gap-4  items-center overflow-x-auto md:overflow-hidden  transition-all duration-300 z-20  mx-auto scroll-smooth "
            ref={scrollBlog}
          >
            {blogs?.map((blog, idx) => (
              <BlogPostCard
                key={"blog+" + idx}
                img={blog.media[0].url}
                title={blog.title}
                videoUrl={blog.videoURL}
                time={moment(blog.createdAt).fromNow()}
                description={blog.description}
                linkTo={"/blogs/" + blog._id}
                translate={translate}
              />
            ))}
          </div>
          <button
            className="bg-white shadow-sm p-3 hover:bg-gray-200 rounded-full absolute top-1/2 left-0 hidden md:inline-block"
            onClick={handlePrev}
          >
            <IoIosArrowBack className="size-8" />
          </button>
          <button
            className="hidden md:inline-block bg-white shadow-sm p-3 hover:bg-gray-200 rounded-full absolute top-1/2 right-0 "
            onClick={handleNext}
          >
            <IoIosArrowForward className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default LatestNewSection;
