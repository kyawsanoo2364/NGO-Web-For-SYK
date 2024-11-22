import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useStaffStore } from "../../store/StaffStore";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";
import { useAuthStore } from "../../store/AuthStore";

const StaffProfileCard = ({
  img,
  name,
  position,
  description,
  fbLink,
  telegramLink,
  isLoading,
  id,
  email,
}) => {
  const { deleteStaff } = useStaffStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuthStore();

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const res = await deleteStaff(id);
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[300px] min-w-[300px]  rounded-md shadow-md w-full animate-pulse">
        <div className="w-full flex flex-col">
          <div className="w-full h-[150px] bg-gray-200 rounded"></div>
          <div className="w-full my-3">
            <h2 className="w-1/2 h-5 bg-gray-200 rounded-full"></h2>
            <p className="text-center  text-[16px] font-semibold text-green-600">
              {position}
            </p>

            <div className="mt-2 w-full h-12 bg-gray-200  rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[300px] min-w-[300px] h-fit rounded-md shadow-md w-full relative group">
      <div>
        {isDeleting && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-300 bg-opacity-60 flex justify-center items-center gap-2 z-10">
            <VscLoading className="size-7 text-slate-800 animate-spin" />
            Deleting...
          </div>
        )}
        {user?.role === "admin" && !isDeleting && (
          <button
            className="absolute top-1 right-1 p-2 bg-red-500 rounded-full text-white group-hover:inline-block hidden"
            onClick={() => handleDelete(id)}
          >
            <MdDelete />
          </button>
        )}
      </div>
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
            {position}
          </p>
          <p className="text-center text-base my-1 text-gray-700 flex items-center gap-2 justify-center">
            <MdEmail />
            {email}
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
