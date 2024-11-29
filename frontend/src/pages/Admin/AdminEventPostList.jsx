import { useEffect, useState } from "react";
import CEEventPostCard from "../../components/Admin/CEEventPostCard";
import EventCard from "../../components/Cards/EventCard";
import { AdminView } from "../../hoc";
import { FaPlus } from "react-icons/fa6";
import { useEventStore } from "../../store/EventStore";
import { memo } from "react";
import { MdEventBusy } from "react-icons/md";
import ToggleSwitchButton from "../../components/toggleSwitchButton";
import { IoMdRefresh } from "react-icons/io";

const AdminEventPostList = () => {
  const [showModalCard, setShowModalCard] = useState(false);
  const { getEvents, events } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  async function fetchData() {
    setIsLoading(true);
    const res = await getEvents();

    if (res) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full p-2">
      <div className="w-full h-full border">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-700 p-5">Events</h1>
          <div className="flex items-center gap-2 mx-10">
            <span className="text-slate-700">EN</span>
            <ToggleSwitchButton
              onChange={(bool) => {
                bool ? setSelectedLanguage("MM") : setSelectedLanguage("EN");
                fetchData();
              }}
            />
            <span className="text-slate-700">MM</span>
          </div>
        </div>

        <div className="flex justify-between items-center my-5 mx-10">
          <button
            className="px-4 py-2 rounded-full border text-gray-500 flex items-center gap-2"
            onClick={() => fetchData()}
          >
            Refresh
            <IoMdRefresh />
          </button>
          <button
            className="p-2 bg-blue-400 text-white rounded-full"
            onClick={() => setShowModalCard(true)}
          >
            <FaPlus className="size-6" />
          </button>
        </div>
        {!isLoading && (!events || events?.length === 0) && (
          <div className="flex justify-center items-center ">
            <div className="flex flex-col items-center gap-1 mt-20 ">
              <MdEventBusy className="size-32 text-slate-500" />
              <h1 className="text-slate-500 text-center font-bold text-2xl select-none">
                No event yet.
              </h1>
            </div>
          </div>
        )}
        <div className="mx-5 grid grid-cols-3 gap-4 max-h-[450px] overflow-y-auto">
          {isLoading
            ? [...new Array(10)].map((_, idx) => (
                <EventCard isLoading={isLoading} key={"loadingEvent-" + idx} />
              ))
            : events?.map((data, idx) => (
                <EventCard
                  id={data._id}
                  key={"events+" + idx}
                  img={data.image}
                  imageUrl={data.image}
                  imageId={data.imageId}
                  data={data}
                  title={
                    selectedLanguage === "EN" ? data.title_en : data.title_mm
                  }
                  time={data.time}
                  location={
                    selectedLanguage === "EN"
                      ? data.location_en
                      : data.location_mm
                  }
                  date={data.date}
                  description={
                    selectedLanguage === "EN"
                      ? data.description_en
                      : data.description_mm
                  }
                />
              ))}
        </div>
        {showModalCard && (
          <CEEventPostCard onClose={() => setShowModalCard(false)} />
        )}
      </div>
    </div>
  );
};
export default memo(AdminView(AdminEventPostList));
