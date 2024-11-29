import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ModleView } from "../hoc";
import { useEventStore } from "../store/EventStore";
import { detectedLanguage, formatTime } from "../utils";
import moment from "moment";
import parser from "html-react-parser";
import { useLanguage } from "../store/LanguageStore";

const Events = () => {
  const { events, getEvents } = useEventStore();
  const [isLoading, setIsLoading] = useState(false);
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getEvents();
      setIsLoading(false);
    }
    fetchData();
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="container mx-auto">
        <div className="mt-20">
          <h3 className="font-semibold text-slate-700 flex gap-2 items-center">
            <Link to={"/"} className="flex gap-2 items-center">
              <FaHome />
              {translate.home}
            </Link>
            <IoIosArrowForward className="mt-1" />
            <Link to={"/events"} className="flex gap-2 items-center">
              {translate.events}
            </Link>
          </h3>
          <h1 className="text-2xl font-bold mt-2 text-orange-500">
            {translate.events}
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-10 gap-2">
          {/** Near Day Event */}
          {isLoading ? (
            <div className="w-full border p-4 flex flex-col animate-pulse">
              <div className="w-full h-[300px] bg-gray-200 rounded" />
              <div className="w-[30%] h-5 bg-gray-200 mt-2 rounded" />
              <div className="w-[60%] h-10 bg-gray-200 mt-2 rounded" />
            </div>
          ) : (
            events && (
              <div className="w-full border p-4 flex flex-col">
                <div className="w-full h-[300px] relative">
                  <img
                    src={events[0]?.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 text-xl font-bold text-white rounded p-4 bg-orange-400">
                    {moment(events[0].date).format("ll")}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mt-2 text-slate-600 px-3 text-sm lg:text-lg">
                    <FaMapLocationDot />{" "}
                    {language === "English"
                      ? events[0]?.location_en
                      : events[0]?.location_mm}
                  </div>
                  <div className="text-sm lg:text-lg flex items-center gap-2 mt-2 text-slate-600 px-3">
                    <FaRegClock /> {formatTime(events[0]?.time)}
                  </div>
                  <div className="mt-2">
                    <Link
                      to={"/event/" + events[0]?._id}
                      className="text-lg text-center font-bold lg:text-2xl hover:text-orange-500 cursor-pointer text-slate-600"
                    >
                      {language === "English"
                        ? events[0]?.title_en
                        : events[0].title_mm}
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
          {/**Other Events */}
          <div className="w-full border p-4 flex flex-col ">
            <h2 className="text-lg font-bold text-slate-600">
              {translate.upcommingEvents}
            </h2>
            <div className="mt-2 w-full h-full overflow-y-auto items-center flex flex-col pt-5 overflow-x-hidden max-h-[380px] gap-2">
              {/** here upcoming events */}
              {isLoading
                ? [...new Array(4)].map((_, idx) => (
                    <div
                      key={"event" + idx}
                      className=" lg:max-w-[520px] lg:min-w-[520px] w-full p-4 border flex items-center shadow-sm gap-2 animate-pulse"
                    >
                      <div className="w-[100px] h-[80px] lg:w-[200px] lg:h-[150px] object-cover rounded bg-gray-200 " />
                      <div className="flex flex-col w-full">
                        <div className="w-[300px] h-5 bg-gray-200 rounded" />
                        <div className="w-full h-14 bg-gray-200 rounded mt-2" />
                        <div className="w-[250px] h-3 bg-gray-200 rounded mt-2" />
                      </div>
                    </div>
                  ))
                : events
                    ?.filter((e) => e._id !== events[0]?._id)
                    .map((event, idx) => (
                      <Link
                        key={"event-" + idx}
                        to={"/event/" + event._id}
                        className=" lg:max-w-[520px] lg:min-w-[520px] w-full p-4 border flex items-center shadow-sm gap-2"
                      >
                        <img
                          src={event.image}
                          className="w-[100px] h-[80px] lg:w-[200px] lg:h-[150px] object-cover rounded"
                        />
                        <div className="flex flex-col w-full">
                          <h2 className="text-lg lg:text-xl hover:text-orange-400 cursor-pointer font-bold text-slate-600  line-clamp-1">
                            {language === "English"
                              ? event.title_en
                              : event.title_mm}
                          </h2>
                          <p className="text-balance text-slate-500 pl-2 line-clamp-3 my-1 lg:text-[16px] text-sm">
                            {language === "English"
                              ? parser(event.description_en)
                              : parser(event.description_mm)}
                          </p>
                          <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-700">
                            <FaMapLocationDot />{" "}
                            {language === "English"
                              ? event.location_en
                              : event.location_mm}
                          </p>
                          <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-600">
                            <FaRegClock /> {event.time}
                          </p>
                        </div>
                      </Link>
                    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModleView(Events);
