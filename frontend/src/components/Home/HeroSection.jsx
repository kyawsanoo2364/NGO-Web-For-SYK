import { motion } from "framer-motion";
import Card from "../Cards/Card";
import { SectionWrapper } from "../../hoc";
import { useHomeStore } from "../../store/HomeStore";
import { detectedLanguage } from "../../utils";
import { useEffect, useState } from "react";
import { useLanguage } from "../../store/LanguageStore";

const HeroSection = () => {
  const { homeInfo } = useHomeStore();

  const { language } = useLanguage();

  return (
    <div className="w-full min-h-screen relative ">
      <img
        src={homeInfo?.hero.backgroundImage}
        className="object-cover w-full min-h-screen"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-center">
        <div className="max-w-4xl p-4 mt-24">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-white"
          >
            {language === "English"
              ? homeInfo?.hero.title_en
              : homeInfo.hero.title_mm}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[15px] mg:text-lg lg:text-xl font-semibold mt-5 text-white"
          >
            {language === "English"
              ? homeInfo?.hero.subTitle_en
              : homeInfo?.hero.subTitle_mm}
          </motion.p>
        </div>
      </div>
      {/* <div className="absolute -bottom-48 left-0 right-0">
        <div className="flex justify-center items-center ">
          <Card
            title={"Make Donation"}
            description={`Your generosity can change lives! Help us provide shelter and support
          to those in need. Donate today and make a lasting impact`}
            buttonName={"Donate"}
            icon={"/donation.png"}
          />
        </div>
      </div> */}
    </div>
  );
};
export default HeroSection;
