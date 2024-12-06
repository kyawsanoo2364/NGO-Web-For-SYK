import { Link } from "react-router-dom";
import EventCard from "../Cards/EventCard";
import { useEventStore } from "../../store/EventStore";
import moment from "moment";
import { detectedLanguage, formatTime } from "../../utils";
import { useEffect, useState } from "react";
import { useLanguage } from "../../store/LanguageStore";

const EventSection = () => {
  const { events, getEvents } = useEventStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getEvents();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (!isLoading && (!events || events?.length === 0)) {
    return null;
  }

  console.log(events);

  return (
    <div className="relative">
      <div className="h-32 md:h-60 w-full relative">
        <img src="2.jpg" className="w-full h-full object-cover -z-20" />
        <div className=" bg-gradient-to-r opacity-90 from-yellow-700 via-yellow-400 backdrop-filter backdrop-blur-md  to-orange-400 w-full h-full absolute top-0 left-0 bottom-0 right-0 "></div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full md:h-1/2">
          <h1 className="text-3xl text-gray-100 font-bold text-center items-center ">
            {translate.ourEvents}
          </h1>
        </div>
      </div>
      <div className="container w-full mx-auto max-w-6xl p-4 md:-mt-32 ">
        {/** Event Cards */}
        <div className="gap-4 flex flex-col items-center justify-center md:flex-row flex-wrap lg:flex-nowrap">
          {isLoading
            ? [...new Array(3)].map((_, idx) => (
                <EventCard key={"event+" + idx} isLoading={isLoading} />
              ))
            : events?.slice(0, 3).map((data, index) => {
                return (
                  <EventCard
                    id={data._id}
                    idx={index + 1}
                    key={"event " + index}
                    img={data.image}
                    date={moment(data.date).format("ll")}
                    location={
                      language === "English"
                        ? data.location_en
                        : data.location_mm
                    }
                    time={data.time}
                    title={
                      language === "English" ? data.title_en : data.title_mm
                    }
                  />
                );
              })}
        </div>
      </div>
      <div className="lg:inline-block flex justify-center mt-4 lg:mt-0">
        <Link
          to={"/events"}
          className=" lg:absolute right-3 -bottom-5 px-4 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-sm"
        >
          {translate.viewAll}
        </Link>
      </div>
    </div>
  );
};
export default EventSection;
