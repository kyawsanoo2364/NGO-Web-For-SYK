import { Link } from "react-router-dom";
import EduCard from "../Cards/EduCard";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SectionWrapper } from "../../hoc";

const EducationProject = () => {
  return (
    <div className="my-10">
      <div className="container max-w-6xl mx-auto flex w-full flex-col ">
        <h1 className="ml-5 text-xl md:text-3xl font-bold text-slate-800">
          Education Projects
        </h1>
        <div className=" mt-10 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-center gap-10 items-center mx-auto w-full">
          {/**Edu Project here */}
          {[...new Array(3)].map((_, idx) => (
            <EduCard
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
        <div className="w-full mt-4  flex justify-end">
          <Link
            to={"/education-projects"}
            className="px-4 py-2 text-[16px] border border-blue-500 rounded-lg text-blue-500 flex  items-center gap-2"
          >
            See All{" "}
            <span>
              <IoIosArrowRoundForward className="size-6" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SectionWrapper(EducationProject, "projects");
