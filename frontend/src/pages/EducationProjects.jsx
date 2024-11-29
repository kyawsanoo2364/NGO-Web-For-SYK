import { Link } from "react-router-dom";
import EduCard from "../components/Cards/EduCard";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

import { ModleView } from "../hoc";
import { useEduProjectStore } from "../store/EduProjectStore";
import { detectedLanguage, handlePromise } from "../utils";
import { useLanguage } from "../store/LanguageStore";

const EducationProjects = () => {
  const { projects, getAllProjects } = useEduProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);
  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [err, res] = await handlePromise(getAllProjects({ limit: 10 }));
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
  return (
    <>
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
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[800px] h-full overflow-y-auto overflow-x-hidden p-4">
              {/**Edu Project here */}
              {isLoading
                ? [...new Array(3)].map((_, idx) => (
                    <EduCard key={"edu+" + idx} idx={idx + 1} isLoading />
                  ))
                : projects?.map((p, idx) => (
                    <EduCard
                      key={"edu+" + idx}
                      idx={idx + 1}
                      data={p}
                      language={language}
                      translate={translate}
                    />
                  ))}
            </div>
            {/**
             *  <button className="mx-auto border px-4 py-2 hover:bg-slate-200">
              Load More...
            </button>
             */}
          </div>
        </div>
      </div>
    </>
  );
};
export default ModleView(EducationProjects);
