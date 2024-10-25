import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="container mx-auto">
        <div className="mt-20">
          <h3 className="font-semibold text-slate-700 flex gap-2 items-center">
            <Link to={"/"} className="flex gap-2 items-center">
              <FaHome />
              Home
            </Link>
            <IoIosArrowForward className="mt-1" />
            <Link to={"/events"} className="flex gap-2 items-center">
              Events
            </Link>
          </h3>
          <h1 className="text-2xl font-bold mt-2 text-orange-500">Events</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-10 gap-2">
          {/** Near Day Event */}
          <div className="w-full border p-4 flex flex-col">
            <div className="w-full h-[300px] relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8hIFtAL38ddjo3ARtHem8e_LDi7zyyP64XA&s"
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 text-xl font-bold text-white rounded p-4 bg-orange-400">
                14 Oct 2024
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mt-2 text-slate-600 px-3 text-sm lg:text-lg">
                <FaMapLocationDot /> Handarwadi Taungoo Bago Myanmar
              </div>
              <div className="text-sm lg:text-lg flex items-center gap-2 mt-2 text-slate-600 px-3">
                <FaRegClock /> 3pm - 5pm
              </div>
              <div className="mt-2">
                <Link
                  to={"/"}
                  className="text-lg text-center font-bold lg:text-2xl hover:text-orange-500 cursor-pointer text-slate-600"
                >
                  Human Rights Watch, Save the Children, Anti-Slavery
                  International, Equality Now
                </Link>
              </div>
            </div>
          </div>
          {/**Other Events */}
          <div className="w-full border p-4 flex flex-col ">
            <h2 className="text-lg font-bold text-slate-600">
              Upcomming Events
            </h2>
            <div className="mt-2 w-full h-full overflow-y-auto items-center flex flex-col pt-5 overflow-x-hidden max-h-[380px] gap-2">
              {/** here upcoming events */}
              {[...new Array(10)].map((_, idx) => (
                <Link
                  key={"event-" + idx}
                  to={"/"}
                  className=" lg:max-w-[520px] lg:min-w-[520px] w-full p-4 border flex items-center shadow-sm gap-2"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8hIFtAL38ddjo3ARtHem8e_LDi7zyyP64XA&s"
                    className="w-[100px] h-[80px] lg:w-[200px] lg:h-[150px] object-cover rounded"
                  />
                  <div className="flex flex-col w-full">
                    <h2 className="text-lg lg:text-xl hover:text-orange-400 cursor-pointer font-bold text-slate-600  line-clamp-1">
                      Education for All Gala
                    </h2>
                    <p className="text-balance text-slate-500 pl-2 line-clamp-3 my-1 lg:text-[16px] text-sm">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Est velit maxime ipsam necessitatibus exercitationem,
                      dolorum animi corporis veritatis voluptate perferendis
                      dignissimos voluptatem sint tempora distinctio dolorem
                      dolore molestias dicta ad?
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-700">
                      <FaMapLocationDot /> Taungoo Bago Myanmar
                    </p>
                    <p className="text-[10px] md:text-sm lg:text-[16px] flex items-center gap-1 pl-2 text-slate-600">
                      <FaRegClock /> 6am - 9am
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
export default Events;
