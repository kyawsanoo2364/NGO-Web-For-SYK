import { useRef } from "react";
import StaffProfileCard from "../Cards/StaffProfileCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const OurStaffSection = () => {
  const scrollRef = useRef(null);
  const handleNext = () => {
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  return (
    <div className="my-10 w-full">
      <div className="container mx-auto relative ">
        <h2 className="text-2xl font-bold text-slate-800">Our Staffs</h2>
        <div
          className=" w-full p-4 mt-5 flex justify-start items-center gap-10 md:overflow-hidden overflow-x-auto mx-auto "
          ref={scrollRef}
        >
          {[...new Array(10)].map((_, idx) => (
            <StaffProfileCard
              name={"Naw Aye Aye " + idx}
              key={"profile+" + idx}
              member={"Project Officer"}
              img={
                "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
              }
              telegramLink={"https://t.me/kyawsan2364"}
              fbLink={"https://www.facebook.com/chirstopher.kyawsanoo"}
            />
          ))}
        </div>
        <button
          className="hidden md:inline-block bg-white shadow-sm p-3 hover:bg-gray-200 rounded-full absolute top-1/2 left-0 "
          onClick={handlePrev}
        >
          <IoIosArrowBack className="size-8" />
        </button>
        <button
          className="hidden md:inline-block bg-white shadow-sm p-3 hover:bg-gray-200 rounded-full absolute top-1/2 right-0 "
          onClick={handleNext}
        >
          <IoIosArrowForward className="size-8" />
        </button>
      </div>
    </div>
  );
};
export default OurStaffSection;
