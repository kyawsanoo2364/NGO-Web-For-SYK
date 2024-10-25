import { FaRegClock } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EventCard = ({ img, title, date, time, location, idx }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ duration: 1, delay: 0.5 * idx }}
      className="max-w-sm w-full shadow-lg p-2 pb-10 bg-white z-10 rounded"
    >
      <div className="w-full h-[150px] relative ">
        <img src={img} className="w-full h-full rounded object-cover " />
        <div className=" absolute px-4 py-3 bottom-0 right-0 rounded bg-orange-500 text-white text-lg font-semibold">
          <h2>{date}</h2>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <div className="flex gap-1 flex-col-reverse">
          <div className="flex gap-3 items-center text-slate-600 font-semibold ">
            <FaMapLocationDot /> {location}
          </div>
          <div className="flex gap-3 items-center text-slate-600 font-semibold">
            <FaRegClock /> {time}
          </div>
        </div>
        <div className="mt-3">
          <Link
            to={"/"}
            className="hover:text-orange-600 text-xl text-slate-700 font-bold line-clamp-3"
          >
            {title}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default EventCard;
