import { Link } from "react-router-dom";
import EduCard from "../Cards/EduCard";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SectionWrapper } from "../../hoc";
import { useEduProjectStore } from "../../store/EduProjectStore";
import { useEffect, useState } from "react";
import { handlePromise } from "../../utils";

const EducationProject = () => {
  const { projects, getAllProjects } = useEduProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [err, res] = await handlePromise(getAllProjects());
      if (err) {
        setIsLoading(false);
        console.log(err);
        return;
      }
      if (res) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (!isLoading && !projects) return null;
  return (
    <div className="my-10">
      <div className="container max-w-6xl mx-auto flex w-full flex-col ">
        <h1 className="ml-5 text-xl md:text-3xl font-bold text-slate-800">
          Education Projects
        </h1>
        <div className=" mt-10 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-center gap-10 items-center mx-auto w-full">
          {/**Edu Project here */}

          {isLoading
            ? [...new Array(3)].map((_, idx) => (
                <EduCard key={"edu+" + idx} idx={idx + 1} isLoading />
              ))
            : projects?.map((p, idx) => (
                <EduCard key={"edu+" + idx} idx={idx + 1} data={p} />
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
