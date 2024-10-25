import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FundriseCard = ({
  image,
  linkTo,
  title,
  description,
  raised,
  goal,
  idx,
  currency,
}) => {
  const percentage = Math.floor((raised / goal) * 100);

  return (
    <motion.div
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ duration: 0.5, delay: 0.5 * idx }}
      className="max-w-[350px] min-w-[350px] w-full p-4 shadow-md rounded"
    >
      <div className="flex flex-col gap-3">
        <img src={image} className="w-full h-[200px] object-cover" />
        <h2 className="text-xl font-bold text-slate-700 capitalize text-center">
          {title}
        </h2>
        <p className="text-pretty text-sm text-slate-500 line-clamp-5">
          {description}
        </p>
        {/** Progress Bar */}
        <div className="w-full h-2 bg-gray-200 my-3 rounded">
          <div
            className={`h-full  bg-green-500 relative`}
            style={{ width: `${percentage}%` }}
          >
            <div className=" rounded-full size-10 p-1 flex items-center justify-center text-[12px] font-semibold text-white -top-4  bg-green-500 absolute right-0 ">
              {percentage}%
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Raised ${raised}</p>
          <p className="text-sm text-gray-400">Goal ${goal}</p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <button className="w-full mx-auto bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
            Donate Now
          </button>
          <Link
            className="w-full mx-auto border border-green-600 px-4 py-2 text-center text-green-600 rounded-full text-sm hover:bg-green-500 hover:text-white"
            to={linkTo}
          >
            See Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default FundriseCard;
