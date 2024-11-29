import { FaMapLocationDot } from "react-icons/fa6";
import Share from "../components/Share";
import { Link, useParams } from "react-router-dom";
import { ModleView } from "../hoc";
import { useEffect, useState } from "react";
import { useEduProjectStore } from "../store/EduProjectStore";
import { useLanguage } from "../store/LanguageStore";
import { memo } from "react";
import htmlParser from "html-react-parser";

const ProjectPostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getProjectDetails, project, getAllProjects, projects } =
    useEduProjectStore();
  const { id } = useParams();
  const { language } = useLanguage();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      await getProjectDetails(id);
      await getAllProjects({ limit: 6 });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-2 bg-slate-100 animate-pulse">
        <div className="container mx-auto">
          <div className="mt-20">
            <div className="flex  lg:flex-row flex-col gap-2">
              <div className="flex-[0.7] ">
                <div className="w-full  p-4 border">
                  <div className="w-full h-[350px] bg-slate-200 rounded" />
                  <div className="mt-2">
                    <div className="bg-slate-200 w-1/2 h-10 rounded"></div>
                    <div className="my-4 bg-slate-200 w-32 h-5 rounded"></div>
                    <div className="my-4 bg-slate-200 w-full h-44 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="flex-[0.3]">
                <div className="w-full h-auto p-2 border">
                  <h3 className="text-lg font-bold text-slate-700">
                    Other Projects
                  </h3>
                  <div className="py-10 w-full overflow-y-auto h-screen flex flex-col justify-start gap-4">
                    {[...new Array(3)].map((_, idx) => (
                      <div
                        key={"project+" + idx}
                        className="flex w-full border p-2 rounded-md"
                      >
                        <div className="w-[100px] h-[80px] object-contain rounded bg-slate-200" />
                        <div className="ml-4 w-full">
                          <div className="w-full h-3 bg-slate-200 rounded"></div>
                          <p className="my-4 w-full h-10 bg-slate-200 rounded"></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 bg-slate-100">
      <div className="container mx-auto">
        <div className="mt-20">
          <div className="flex  lg:flex-row flex-col gap-2">
            <div className="flex-[0.7] ">
              <div className="w-full  p-4 border">
                <img
                  src={project?.logoImage}
                  alt=""
                  className="w-full h-[350px] object-contain rounded"
                />
                <div className="mt-2">
                  <h2 className="text-center text-2xl font-bold text-slate-700">
                    {language === "English"
                      ? project?.title_en
                      : project?.title_mm}
                  </h2>
                  <p className="flex gap-2 text-[16px] text-slate-600 mt-2 items-center">
                    <FaMapLocationDot />
                    {language === "English"
                      ? project?.location_en
                      : project?.location_mm}
                  </p>
                  <p className="mt-2">
                    {project &&
                      htmlParser(
                        language === "English"
                          ? project?.description_en
                          : project?.description_mm
                      )}
                  </p>
                </div>

                <Share
                  shareTitle={"Bright Future"}
                  currentUrl={window.location.href}
                />
              </div>
            </div>
            <div className="flex-[0.3]">
              <div className="w-full h-auto p-2 border">
                <h3 className="text-lg font-bold text-slate-700">
                  Other Projects
                </h3>
                <div className="py-10 w-full overflow-y-auto h-screen flex flex-col justify-start gap-4">
                  {projects
                    ?.filter((p) => p._id !== project?._id)
                    .map((p, idx) => (
                      <Link
                        key={"project+" + idx}
                        className="flex w-full border p-2 rounded-md"
                        to={`/project/${p._id}`}
                      >
                        <img
                          className="w-[100px] h-[80px] object-contain"
                          src={p.logoImage}
                        />
                        <div className="ml-4 w-full">
                          <h2 className="text-lg font-semibold text-slate-700 line-clamp-1">
                            {language === "English" ? p.title_en : p.title_mm}
                          </h2>
                          <p className="line-clamp-1">
                            {language === "English" ? p.title_en : p.title_mm}
                          </p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ModleView(ProjectPostDetails));
