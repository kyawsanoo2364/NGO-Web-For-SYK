import { motion } from "framer-motion";

const Card = ({ title, description, icon, buttonName, onClickButton }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 1 }}
      className="max-w-sm w-full rounded-lg bg-white shadow-md p-4 hidden md:inline-block"
    >
      <div className="flex justify-center items-center">
        <img src={icon} className="size-28 object-cover mix-blend-multiply" />
      </div>
      <div className="flex flex-col gap-2 text-center text-balance">
        <h1 className="text-xl md:text-2xl text-slate-700 font-bold">
          {title}
        </h1>
        <p className="text-[16px] text-slate-700">{description}</p>
        <button
          className="mt-5 mx-auto px-8 py-2 bg-orange-400 text-white text-lg font-semibold rounded-full max-w-44  "
          onClick={onClickButton}
        >
          {buttonName}
        </button>
      </div>
    </motion.div>
  );
};
export default Card;
