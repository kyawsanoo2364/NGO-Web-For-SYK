import { Link } from "react-router-dom";
import BlogPostCard from "../components/Cards/BlogPostCard";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";

const Blog = () => {
  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="container mx-auto">
        <div className="mt-20">
          <h3 className="font-semibold text-slate-700 flex gap-2 w-full items-center">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <IoIosArrowForward className="mt-1" />
            <Link to={"/blogs"}>blogs</Link>
          </h3>
          <h1 className="mt-4 text-xl font-bold text-slate-700">
            Our Stories & Activities
          </h1>

          <div className="mt-5 max-h-[500px]  h-full overflow-y-auto flex flex-col justify-start py-10 items-center gap-10 ">
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
            <button className="px-4 py-2 border rounded font-semibold hover:bg-gray-200 ">
              Load More...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
