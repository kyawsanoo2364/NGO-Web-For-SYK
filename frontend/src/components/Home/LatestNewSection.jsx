import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import BlogPostCard from "../Cards/BlogPostCard";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const LatestNewSection = () => {
  const scrollBlog = useRef();

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
            Latest News <IoIosArrowForward className="size-5 text-slate-800 " />{" "}
            <Link
              to={"/blogs"}
              className="text-lg font-normal text-blue-500 hover:underline"
            >
              View All
            </Link>
          </h1>
          <div
            className="mt-5 flex flex-row  justify-start  gap-4  items-center overflow-x-auto md:overflow-hidden  transition-all duration-300 z-20  mx-auto scroll-smooth "
            ref={scrollBlog}
          >
            {[...new Array(10)].map((_, idx) => (
              <BlogPostCard
                key={"blog+" + idx}
                img={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSop1mCkQRs48V_WwsZHt-mK7jTqgiiZuBKZA&s"
                }
                title={`${idx} Ever feel like the world's problems are as complex as quantum physics?
Us too. Especially when it comes to tackling climate change. There’s
so much to be done. But what if the solution isn't rocket science?
What if it's as simple as a shift in the way we work?`}
                time={"3 days ago"}
                description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eos
  sequi corrupti quis vitae repellendus eius fugit quasi! Praesentium,
  magnam distinctio accusamus est dignissimos quae quasi rem cum
  provident sint.`}
                linkTo={"/"}
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
