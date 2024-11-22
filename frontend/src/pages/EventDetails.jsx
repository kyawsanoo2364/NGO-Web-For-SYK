import { FaRegClock } from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import Share from "../components/Share";
import { FaMapLocationDot } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ModleView } from "../hoc";
import { useEffect, useState } from "react";
import { useEventStore } from "../store/EventStore";
import moment from "moment";
import "../tiptap-tailwind.css";
import parser from "html-react-parser";
import { formatTime } from "../utils";

const EventDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getEvent, getEvents, events } = useEventStore();

  async function fetchData() {
    try {
      setIsLoading(true);
      await getEvents();

      const res = await getEvent(id);
      if (res) {
        setData(res.data.content);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const currentUrl = window.location.href;

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row  mt-20 mb-10 gap-2 relative">
            {isLoading ? (
              <div className="flex-[0.7] p-4 rounded-sm animate-pulse">
                <div className="w-full h-full">
                  <div className="w-full h-[400px] bg-gray-200 rounded" />
                  <div className="mt-2 w-3/4 h-5 bg-gray-200 rounded-full" />
                  <div className="mt-2 w-1/2 h-5 bg-gray-200 rounded-full" />
                  <div className="mt-2 w-full h-[100px] bg-gray-200 rounded" />
                </div>
              </div>
            ) : (
              <div className="flex-[0.7]  p-4 border rounded-sm">
                <div className="w-full h-[400px] relative">
                  <div className="bg-orange-500 p-4 absolute top-0 left-0 rounded text-lg font-semibold text-white">
                    {moment(data?.date).format("ll")}{" "}
                  </div>
                  <img
                    src={data?.image}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="mt-2">
                  <h1 className="text-xl font-bold text-slate-700">
                    {data?.title}
                  </h1>
                  <p className="flex gap-2 text-[16px] text-slate-600 mt-2 items-center">
                    <FaMapLocationDot />
                    {data?.location}
                  </p>
                  <p className="flex gap-2 text-[16px] text-slate-600 mt-2 items-center">
                    <FaRegClock />
                    {formatTime(data?.time)}
                  </p>
                  <p className="mt-3 text-slate-700  ProseMirror">
                    {parser(data?.description || "")}
                  </p>
                </div>
                <Share shareTitle={data?.title} currentUrl={currentUrl} />
              </div>
            )}
            <div className="flex-[0.3]">
              <div className="w-full h-[500px] p-4 border ">
                <h2 className="text-lg font-bold text-slate-600">
                  Other Events
                </h2>
                <div className="mt-2 w-full h-full overflow-y-auto items-center flex flex-col pt-5 overflow-x-hidden max-h-[420px] gap-2">
                  {/** here upcoming events */}
                  {isLoading
                    ? [...new Array(3)].map((_, idx) => (
                        <div
                          key={"event" + idx}
                          className=" lg:max-w-[400px] lg:min-w-[400px] w-full p-4 border flex items-center shadow-sm gap-2 animate-pulse"
                        >
                          <div className="w-[100px] h-[80px] lg:w-[100px] lg:h-[80px] bg-gray-200 rounded" />
                          <div className="flex flex-col">
                            <div className="w-[200px] h-2 bg-gray-200 rounded-full" />
                            <div className="w-[200px] mt-2 h-10 bg-gray-200 rounded" />
                          </div>
                        </div>
                      ))
                    : events
                        ?.filter((e) => e._id !== id)
                        ?.map((event, idx) => (
                          <Link
                            key={"event-" + idx}
                            to={"/event/" + event?._id}
                            className=" lg:max-w-[400px] lg:min-w-[400px] w-full p-4 border flex items-center shadow-sm gap-2"
                          >
                            <img
                              src={event?.image}
                              className="w-[100px] h-[80px] lg:w-[100px] lg:h-[80px] object-cover rounded"
                            />
                            <div className="flex flex-col w-full">
                              <h2 className="text-md lg:text-xl hover:text-orange-400 cursor-pointer font-bold text-slate-600  line-clamp-1">
                                {event?.title}
                              </h2>
                              <p className="pl-2 line-clamp-3 my-1 lg:text-[16px] text-sm">
                                {parser(event?.description)}
                              </p>
                              <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-700 line-clamp-1">
                                <FaMapLocationDot /> {event?.location}
                              </p>
                              <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-600">
                                <FaRegClock /> {formatTime(event?.time)}
                              </p>
                            </div>
                          </Link>
                        ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModleView(EventDetails);
