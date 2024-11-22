import { useEffect, useRef, useState } from "react";
import StaffProfileCard from "../Cards/StaffProfileCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useStaffStore } from "../../store/StaffStore";

const OurStaffSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getStaffs, staffs } = useStaffStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getStaffs();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  if (!isLoading && (staffs?.length === 0 || !staffs)) {
    return null;
  }

  return (
    <div className="my-10 w-full">
      <div className="container mx-auto relative ">
        <h2 className="text-2xl font-bold text-slate-800">Our Staffs</h2>
        <div
          className=" w-full p-4 mt-5 flex justify-start items-center gap-10 md:overflow-hidden overflow-x-auto mx-auto "
          ref={scrollRef}
        >
          {isLoading
            ? [...new Array(10)].map((_, idx) => (
                <StaffProfileCard key={"profile+" + idx} isLoading={true} />
              ))
            : staffs?.map((staff, idx) => (
                <StaffProfileCard
                  name={staff.name}
                  key={"profile+" + idx}
                  position={staff.position}
                  img={staff.imageUrl}
                  telegramLink={staff.telegramLink}
                  fbLink={staff.facebookLink}
                  email={staff.email}
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
