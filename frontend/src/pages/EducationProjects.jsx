import { Link } from "react-router-dom";
import EduCard from "../components/Cards/EduCard";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";

const EducationProjects = () => {
  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="container mx-auto">
        <div className="mt-14  p-4  bg-slate-100 w-full">
          <h3 className="font-semibold text-slate-700 flex gap-2 w-full items-center">
            <Link to={"/"} className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <IoIosArrowForward className="mt-1" />
            <Link to={"/education-projects"}>education-projects</Link>
          </h3>
          <h1 className="mt-4 font-bold text-xl text-slate-700">
            Education Projects
          </h1>
        </div>
        <div className="mt-0">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[500px] h-full overflow-y-auto overflow-x-hidden p-4">
            {/**Edu Project here */}
            {[...new Array(10)].map((_, idx) => (
              <EduCard
                key={"edu+" + idx}
                idx={idx + 1}
                location={"Taungoo,Bago,Myanmar"}
                time={"15 Oct 2025"}
                logoImage={
                  "https://img.pikbest.com/png-images/education-logo-vector-graphic-element_1552512.png!sw800"
                }
                title={"Bright Future Project"}
                description={
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa ullam et sit consequuntur quam excepturi, itaque quia debitis facere pariatur ipsum non deserunt. Quasi vitae veritatis praesentium quod nisi quia!"
                }
              />
            ))}
          </div>
          <button className="mx-auto border px-4 py-2 hover:bg-slate-200">
            Load More...
          </button>
        </div>
      </div>
    </div>
  );
};
export default EducationProjects;
