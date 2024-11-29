import { Link } from "react-router-dom";
import { FaMapLocation } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEdit, FaSpinner, FaTrashAlt } from "react-icons/fa";
import ConfirmBox from "../ConfirmBox";
import { useEduProjectStore } from "../../store/EduProjectStore";
import { toast } from "react-toastify";
import parser from "html-react-parser";
import CEEduProjectCardModal from "../Modal/CEEduProjectCardModal";
import moment from "moment";
import { useAuthStore } from "../../store/AuthStore";

const EduCard = ({
  idx,
  id,
  data,
  hideDonateButton = false,
  isLoading = false,
  translate,
  language,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const { deleteProject } = useEduProjectStore();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const { user } = useAuthStore();

  const handleDelete = async (id) => {
    try {
      setShowConfirmBox(false);
      setDeleteLoading(true);
      const res = await deleteProject(id);
      if (res) {
        setDeleteLoading(false);
      }
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // Function to check window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set threshold for mobile width (768px)
    };

    // Initial check
    handleResize();

    // Add event listener to handle screen resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={() =>
          isMobile
            ? {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 0 },
              }
            : {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 100 },
              }
        }
        transition={{ duration: 0.5, delay: 0.1 * idx }}
        className={`max-w-sm w-full p-6 border shadow-md rounded-sm h-fit  relative animate-pulse`}
      >
        <div className="my-2">
          <div className="w-full h-[200px] bg-gray-200" />
        </div>
        <div className="p-2">
          <div className="w-full h-5 bg-gray-200 rounded-full" />
          <div className="w-1/2 h-5 mt-2 bg-gray-200 rounded-full" />
          <div className="w-full h-14 bg-gray-200 rounded mt-2"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {showEditBox && (
        <CEEduProjectCardModal
          onClose={() => setShowEditBox(false)}
          edit
          data={data}
        />
      )}
      {showConfirmBox && (
        <ConfirmBox
          onCancel={() => setShowConfirmBox(false)}
          text={"Are you sure? You wanna delete it."}
          onConfirm={() => handleDelete(id)}
        />
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={() =>
          isMobile
            ? {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 0 },
              }
            : {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 100 },
              }
        }
        transition={{ duration: 0.5, delay: 0.1 * idx }}
        className={`max-w-sm w-full p-6 border shadow-md rounded-sm h-fit ${
          deleteLoading ? "" : "group"
        } relative`}
      >
        {deleteLoading && (
          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-gray-300 bg-opacity-30 z-30 flex justify-center items-center flex-col gap-2">
            <FaSpinner className="size-7 text-slate-900 animate-spin" />
          </div>
        )}
        {/** admin section */}
        {user?.role === "admin" && (
          <div className="w-full group-hover:flex justify-end absolute top-0 right-0 p-2 hidden">
            <div className="flex gap-2 ">
              <button
                className="p-2 bg-green-500 text-white rounded-full"
                onClick={() => setShowEditBox(true)}
              >
                <FaEdit />
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-full"
                onClick={() => setShowConfirmBox(true)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        )}
        {/**normal */}
        <div className="my-2">
          <img
            src={data?.logoImage}
            className="w-full h-[200px] object-contain"
          />
        </div>
        <div className="p-2">
          <h1 className="text-2xl font-bold text-slate-900 text-start">
            {language === "English" ? data?.title_en : data?.title_mm}
          </h1>
          <div className="mt-2 text-sm text-slate-700 flex flex-col gap-2 ">
            <span className="flex items-center gap-2 ">
              <FaMapLocation className="size-4" />{" "}
              {language === "English" ? data?.location_en : data?.location_mm}
            </span>
            <span className="flex items-center gap-2">
              <IoTimeOutline /> {moment(data?.date).format("ll")}
            </span>
          </div>
          <div className=" mt-2 line-clamp-5 text-slate-600">
            {data &&
              parser(
                language === "English"
                  ? data?.description_en
                  : data?.description_mm
              )}
          </div>
          <div className="mt-5 flex justify-end items-center">
            <Link
              className="px-3 py-2 text-blue-500 border border-blue-400 mx-3 text-[16px] rounded-full"
              to={`/project/${data?._id}`}
            >
              {translate.learnMore}
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default EduCard;
