import TrustAboutSection from "./TrustAboutSection";
import VisionMissionCard from "../Cards/VisionMissionCard";
import { motion } from "framer-motion";
import { SectionWrapper } from "../../hoc";

const AboutSection = () => {
  return (
    <div className="w-full bg-slate-50 pb-24 md:pb-[300px] relative select-none">
      <div className="h-2 w-full bg-gray-800"></div>
      <div className="">
        {/**md:mt-64 */}
        <TrustAboutSection companyName={"Show Your Kindness"} />
        <div className="mx-auto max-w-5xl flex flex-col">
          <VisionMissionCard
            reverse={true}
            title={"Who we are"}
            icon={"/whoweare.png"}
            description={`[NGO Name] is a dedicated team of changemakers working to create a brighter future for vulnerable communities. Founded in [Year], we focus on addressing critical issues like poverty, education, healthcare, and environmental sustainability. Through collaboration with local partners and innovative solutions, we aim to uplift lives and foster positive, long-lasting change. Driven by compassion and a commitment to justice, we work every day to build a better world for all.`}
            delay={0}
          />
          <VisionMissionCard
            reverse={false}
            title={"Our Mission"}
            icon={"/mission.png"}
            description={`Our mission at [NGO Name] is to create lasting change by empowering
          underserved communities through education, advocacy, and sustainable
          development. We strive to address inequality, promote human rights,
          and improve the quality of life for those in need. By working
          alongside local partners, we aim to build a more just and equitable
          world where everyone has the opportunity to thrive.`}
            delay={0.5}
          />
          <VisionMissionCard
            reverse={true}
            title={"Our Vision"}
            icon={"/vision.png"}
            description={`Our mission at [NGO Name] is to create lasting change by empowering
          underserved communities through education, advocacy, and sustainable
          development. We strive to address inequality, promote human rights,
          and improve the quality of life for those in need. By working
          alongside local partners, we aim to build a more just and equitable
          world where everyone has the opportunity to thrive.`}
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
