import TrustAboutSection from "./TrustAboutSection";
import VisionMissionCard from "../Cards/VisionMissionCard";
import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";
import { useHomeStore } from "../../store/HomeStore";
import { detectedLanguage } from "../../utils";
import { useEffect, useState } from "react";
import { useLanguage } from "../../store/LanguageStore";

const AboutSection = () => {
  const { homeInfo } = useHomeStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);
  return (
    <div className="w-full bg-slate-50 pb-24 md:pb-[300px] relative select-none">
      <div className="h-2 w-full bg-gray-800"></div>
      <div className="">
        {/**md:mt-64 */}
        <TrustAboutSection
          companyName={"Show Your Kindness"}
          translate={translate}
        />
        <div className="mx-auto max-w-5xl flex flex-col">
          <VisionMissionCard
            reverse={true}
            title={translate.whoWeAre}
            icon={"/whoweare.png"}
            description={
              language === "English" ? homeInfo?.about_en : homeInfo?.about_mm
            }
            delay={0}
          />
          <VisionMissionCard
            reverse={false}
            title={translate.ourMission}
            icon={"/mission.png"}
            description={
              language === "English"
                ? homeInfo?.mission_en
                : homeInfo?.mission_mm
            }
            delay={0.5}
          />
          <VisionMissionCard
            reverse={true}
            title={translate.ourVision}
            icon={"/vision.png"}
            description={
              language === "English" ? homeInfo?.vision_en : homeInfo?.vision_mm
            }
            delay={0.8}
          />
        </div>
      </div>
      <motion.div
        initial="hidden"
        whileInView={"visible"}
        viewport={{
          once: true,
        }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
        transition={{ duration: 3 }}
        className="absolute left-0 right-0 bottom-0 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          id="visual"
          viewBox="0 0 900 600"
          className="size-[100%]"
          version="1.1"
        >
          <path
            d="M0 397L21.5 411.5C43 426 86 455 128.8 466.8C171.7 478.7 214.3 473.3 257.2 464.3C300 455.3 343 442.7 385.8 449.7C428.7 456.7 471.3 483.3 514.2 492.3C557 501.3 600 492.7 642.8 474C685.7 455.3 728.3 426.7 771.2 422C814 417.3 857 436.7 878.5 446.3L900 456L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
            fill="#17ff00"
            stroke-linecap="round"
            stroke-linejoin="miter"
          />
        </svg>
      </motion.div>
    </div>
  );
};
export default SectionWrapper(AboutSection, "about-us");
