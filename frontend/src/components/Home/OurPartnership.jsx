import { useEffect, useState } from "react";
import { SectionWrapper } from "../../hoc";
import { useLanguage } from "../../store/LanguageStore";
import { usePartnershipsStore } from "../../store/PartnershipsStore";
import { detectedLanguage } from "../../utils";
import PartnershipCard from "../Cards/PartnershipCard";
import { motion } from "framer-motion";

const OurPartnership = ({ partnershipDescription }) => {
  const { partnerships } = usePartnershipsStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  if (!partnerships || partnerships?.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-4 bg-slate-800 ">
      <motion.div
        initial="hidden"
        whileInView={"visible"}
        viewport={{ once: true }}
        transition={{
          duration: 2,
        }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        className="container mx-auto my-10 "
      >
        <h1 className="text-center uppercase text-white text-2xl md:text-3xl font-bold">
          {translate.ourPartnerships}
        </h1>
        <h3 className="text-center mt-3 text-slate-200 font-semibold text-[16px] md:text-lg">
          {partnershipDescription}
        </h3>
        <div className="flex justify-center flex-wrap items-center gap-16 my-20 relative h-fit ">
          {/**Your Partnerships here */}
          {/**For example */}
          {partnerships.map((p, idx) => (
            <PartnershipCard
              key={"partnership-" + idx}
              logo={p.imageUrl}
              name={p.name}
              link={p.webLink}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default SectionWrapper(OurPartnership, "partnerships");
