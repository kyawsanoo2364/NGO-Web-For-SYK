import { Link } from "react-router-dom";
import { FaMapLocation } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const EduCard = ({ title, logoImage, description, location, time, idx }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 50 },
      }}
      transition={{ duration: 0.5, delay: 0.1 * idx }}
      className="max-w-sm w-full p-6 border shadow-md rounded-sm"
    >
      <div className="my-2">
        <img src={logoImage} className="w-full h-[200px] object-contain" />
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold text-slate-900 text-start">
          {title}
        </h1>
        <div className="mt-2 text-sm text-slate-700 flex flex-col lg:flex-row gap-2 lg:gap-4">
          <span className="flex items-center gap-2 ">
            <FaMapLocation className="size-4" /> {location}
          </span>
          <span className="flex items-center gap-2">
            <IoTimeOutline /> {time}
          </span>
        </div>
        <div className=" mt-2 line-clamp-5 text-slate-600">{description}</div>
        <div className="mt-5 flex justify-between items-center">
          <button className="bg-orange-400 px-3 py-2 rounded-full text-[16px] text-white ">
            Donate Now
          </button>
          <Link className="px-3 py-2 text-blue-500 border border-blue-400 mx-3 text-[16px] rounded-full">
            Learn more
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default EduCard;
