import { useEffect, useState } from "react";
import CEEventPostCard from "../../components/Admin/CEEventPostCard";
import EventCard from "../../components/Cards/EventCard";
import { AdminView } from "../../hoc";
import { FaPlus } from "react-icons/fa6";
import { useEventStore } from "../../store/EventStore";
import { memo } from "react";

const AdminEventPostList = () => {
  const [showModalCard, setShowModalCard] = useState(false);
  const { getEvents, events } = useEventStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getEvents();

      if (res) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [events]);

  return (
    <div className="min-h-screen w-full p-2">
      <div className="w-full h-full border">
        <h1 className="text-2xl font-bold text-slate-700 p-5">Events</h1>
        <div className="flex justify-end items-center my-5 mx-10">
          <button
            className="p-2 bg-blue-400 text-white rounded-full"
            onClick={() => setShowModalCard(true)}
          >
            <FaPlus className="size-6" />
          </button>
        </div>
        {!isLoading && (!events || events?.length === 0) && (
          <div className="flex justify-center items-center ">
            <h1 className="text-slate-500 text-center font-bold text-2xl mt-20 select-none">
              No event yet.
            </h1>
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
                  title={data.title}
                  time={data.time}
                  location={data.location}
                  date={data.date}
                  description={data.description}
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
