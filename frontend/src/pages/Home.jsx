import AboutSection from "../components/Home/AboutSection";
import ActivityVideo from "../components/Home/ActivityVideo";
import ContactUsSection from "../components/Home/ContactUsSection";
import EducationProject from "../components/Home/EducationProject";
import EventSection from "../components/Home/EventSection";
import HeroSection from "../components/Home/HeroSection";
import LatestNewSection from "../components/Home/LatestNewSection";
import OurCausesSection from "../components/Home/OurCausesSection";
import OurPartnership from "../components/Home/OurPartnership";
import OurStaffSection from "../components/Home/OurStaffSection";

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <HeroSection />
      <AboutSection />
      <div className="h-1 bg-slate-700 w-full"></div>
      <ActivityVideo videoUrl={"https://www.youtube.com/watch?v=M-P4QBt-FWw"} />
      <div className="h-1 bg-slate-700 w-full"></div>
      <EventSection />
      <OurCausesSection />
      <EducationProject />
      <OurPartnership
        partnershipDescription={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        fugit corrupti vel qui quod eos ad eligendi obcaecati, incidunt
        veritatis deleniti dolor numquam in reiciendis cumque atque nesciunt
        facilis ipsam?`}
      />
      <OurStaffSection />
      {/** Our blog */}
      <LatestNewSection />
      <ContactUsSection />
    </div>
  );
};
export default Home;
