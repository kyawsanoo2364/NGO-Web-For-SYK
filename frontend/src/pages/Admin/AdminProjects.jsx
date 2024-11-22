import { AdminView } from "../../hoc";
import { memo, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import CEEduProjectCardModal from "../../components/Modal/CEEduProjectCardModal";
import { useEduProjectStore } from "../../store/EduProjectStore";
import { handlePromise } from "../../utils";
import EduCard from "../../components/Cards/EduCard";

const AdminProjects = () => {
  const [showCEModalCard, setShowCEModalCard] = useState(false);
  const { getAllProjects, projects } = useEduProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  console.log(projects);
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

  return (
    <>
      {showCEModalCard && (
        <CEEduProjectCardModal onClose={() => setShowCEModalCard(false)} />
      )}
      <div className="min-h-screen w-full p-2">
        <div className="w-full h-full border">
          <h1 className="text-2xl text-slate-800 font-bold p-4">
            Education Projects
          </h1>
          <div className="mt-4 flex justify-end items-center mx-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-lg bg-blue-400 rounded-full text-white flex items-center gap-2"
              onClick={() => setShowCEModalCard(true)}
            >
              <FaPlus className="inline-block size-6" /> Create Project
            </motion.button>
          </div>
          {!isLoading && (!projects || projects.length === 0) ? (
            <div className="mt-20 flex flex-col gap-4 justify-center items-center">
              <img src="/empty.png" />
              <h1 className="font-bold text-slate-400 text-xl">
                No Project Yet.
              </h1>
            </div>
          ) : isLoading ? (
            <div className="flex w-full max-h-[450px] h-full  mt-5 overflow-y-auto gap-10 p-4 flex-wrap justify-evenly">
              {[...new Array(2)].map((_, idx) => (
                <EduCard idx={idx} key={"edu+" + idx} isLoading />
              ))}
            </div>
          ) : (
            <div className="flex w-full max-h-[450px] h-full  mt-5 overflow-y-auto gap-10 p-4 flex-wrap justify-evenly">
              {projects?.map((project, idx) => (
                <EduCard
                  id={project._id}
                  key={"educard+" + idx}
                  hideDonateButton
                  data={project}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(AdminView(AdminProjects));
