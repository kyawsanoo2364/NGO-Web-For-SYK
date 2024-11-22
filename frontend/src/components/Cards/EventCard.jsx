import { FaRegClock } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import CEEventPostCard from "../Admin/CEEventPostCard";
import moment from "moment";
import { formatTime } from "../../utils";
import ConfirmBox from "../ConfirmBox";
import { useEventStore } from "../../store/EventStore";
import { ImSpinner8 } from "react-icons/im";
import { useAuthStore } from "../../store/AuthStore";

const EventCard = ({
  img,
  title,
  date,
  time,
  location,
  idx,
  isLoading,
  id,
  imageUrl,
  imageId,
  description,
}) => {
  const { deleteEvent } = useEventStore();
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuthStore();
  if (isLoading) {
    return (
      <motion.div className="max-w-sm w-full shadow-lg p-2 pb-10 animate-pulse bg-white z-10 rounded">
        <div className="w-full h-[150px] relative ">
          <div className="w-full h-full bg-gray-100 rounded  " />
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex gap-1 flex-col-reverse">
            <div className="flex gap-3 items-center bg-gray-200 w-[100px] rounded-full p-1 font-semibold "></div>
            <div className="flex gap-3 items-center bg-gray-200 w-[200px] rounded-full p-1 font-semibold mt-2"></div>
          </div>
          <div className="mt-3">
            <div className="w-full h-5 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    );
  }
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      setShowConfirmModal(false);
      setDeleteLoading(true);
      const res = await deleteEvent(id);
      if (res) {
        setDeleteLoading(false);
      }
    } catch (error) {
      setDeleteLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {showConfirmModal && (
        <ConfirmBox
          text={"Are you sure? You want to delete it."}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}
      {showModal && (
        <CEEventPostCard
          isEdit
          onClose={() => setShowModal(false)}
          data={{
            img,
            title,
            description,
            time,
            location,
            date,
            id,
            imageUrl,
            imageId,
          }}
        />
      )}
      <motion.div
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        transition={{ duration: 0.3, delay: 0.1 * idx }}
        className="group max-w-sm w-full shadow-md border p-2 pb-10 bg-white z-10 rounded relative"
      >
        {isDeleteLoading && (
          <div className="absolute z-30 bg-gray-300 bg-opacity-50 top-0 bottom-0 left-0 right-0 w-full h-full justify-center flex items-center">
            <ImSpinner8 className="size-7 text-gray-500 animate-spin" />
          </div>
        )}
        {/** Admin Edit */}
        {user?.role === "admin" && (
          <div className="hidden group-hover:block">
            <button
              className="absolute top-1 right-2 z-20 bg-yellow-500 rounded-full text-white p-1"
              onClick={() => setShowModal(true)}
            >
              <MdModeEditOutline className="size-6" />
            </button>
            <button
              className="absolute top-1 right-12 z-20 bg-red-500 rounded-full text-white p-2"
              onClick={() => setShowConfirmModal(true)}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        )}

        <div className="w-full h-[150px] relative ">
          <img src={img} className="w-full h-full rounded object-cover " />
          <div className=" absolute px-4 py-3 bottom-0 right-0 rounded bg-orange-500 text-white text-lg font-semibold">
            <h2>{moment(date).format("ll")}</h2>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex gap-1 flex-col-reverse">
            <div className="flex gap-3 items-center text-slate-600 font-semibold ">
              <FaMapLocationDot /> {location}
            </div>
            <div className="flex gap-3 items-center text-slate-600 font-semibold">
              <FaRegClock /> {formatTime(time)}
            </div>
          </div>
          <div className="mt-3">
            <Link
              to={"/event/" + id}
              className="hover:text-orange-600 text-xl text-slate-700 font-bold line-clamp-3"
            >
              {title}
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default EventCard;
