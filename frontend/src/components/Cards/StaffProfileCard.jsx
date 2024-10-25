import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

const StaffProfileCard = ({
  img,
  name,
  member,
  description,
  fbLink,
  telegramLink,
}) => {
  return (
    <div className="max-w-[300px] min-w-[300px] rounded-md shadow-md w-full">
      <div className="w-full flex flex-col">
        <div className="w-full h-[150px]">
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="w-full my-3">
          <h2 className="text-center font-semibold text-slate-800 text-xl">
            {name}
          </h2>
          <p className="text-center  text-[16px] font-semibold text-green-600">
            {member}
          </p>
          <p className="text-slate-500 text-center mx-2 line-clamp-2 text-sm text-balance mt-2">
            {description}
          </p>
          <div className="mx-auto my-3 w-[80%] h-[1px] bg-slate-400" />
          <div className="flex justify-center items-center gap-3">
            <a className="cursor-pointer" href={fbLink} target="_blank">
              <FaFacebook className="size-5 text-blue-600" />
            </a>
            <a className="cursor-pointer " href={telegramLink} target="_blank">
              <FaTelegram className="size-5 text-blue-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffProfileCard;
