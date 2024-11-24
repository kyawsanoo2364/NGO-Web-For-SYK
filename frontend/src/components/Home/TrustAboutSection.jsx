import { motion } from "framer-motion";

import parser from "html-react-parser";

const TrustAboutSection = ({ companyName, translate }) => {
  return (
    <div className="w-full mt-6 mb-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 100 },
        }}
        className="mx-auto container max-w-5xl flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-2xl md:text-4xl font-semibold text-slate-800">
            Trust About
          </h1>
          <p className="text-[16px] md:text-lg text-center font-semibold text-slate-700">
            {parser(translate.trustAbout)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default TrustAboutSection;
