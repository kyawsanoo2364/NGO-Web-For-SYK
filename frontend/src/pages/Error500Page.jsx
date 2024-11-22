import { memo } from "react";
import { LuServerOff } from "react-icons/lu";
import { TbFaceIdError } from "react-icons/tb";

const Error500Page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-100 p-4">
      <div className="flex flex-col gap-2 items-center">
        <LuServerOff className="size-32 lg:size-60 text-slate-600" />
        <h1 className="md:text-xl text-lg lg:text-3xl font-bold text-slate-600 flex items-center gap-2">
          <TbFaceIdError className="size-10" />
          500 - Internal Server Error
        </h1>
        <p className="text-slate-600 md:text-base text-sm">
          Sorry! It's me, not you.
        </p>
        <p className="text-slate-600 md:text-base text-sm">{"):"}</p>
        <p className="text-slate-600 md:text-base text-sm">
          We appologize for this inconvenience. Please try again later.
        </p>
      </div>
    </div>
  );
};
export default memo(Error500Page);
