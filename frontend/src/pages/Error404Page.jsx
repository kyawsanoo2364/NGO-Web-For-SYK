import { Link } from "react-router-dom";
import ModleView from "../hoc/ModleView";
import { memo } from "react";

const Error404Page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-200 ">
      <div className="w-full h-[700px] mb-0">
        <img src="/404.jpg" className="object-cover w-full h-full" alt="" />
      </div>
      <div className="absolute">
        <div className="flex flex-col gap-2 items-center bg-white p-10 px-20 rounded backdrop-filter backdrop-blur-md bg-opacity-50">
          <h1 className="lg:text-6xl  text-2xl md:text-3xl font-bold text-gray-700">
            404
          </h1>
          <p className="text-xl lg:text-3xl font-bold text-gray-700">
            Opps!... Page not found
          </p>
          <div className="flex justify-center items-center flex-col gap-2 mt-4">
            <p className="text-lg lg:text-xl font-semibold text-gray-700">
              You should go back
            </p>
            <Link
              to={"/"}
              className="px-4 py-2  rounded bg-green-400 font-semibold text-lg text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(ModleView(Error404Page));
