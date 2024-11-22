import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { usePartnershipsStore } from "../../store/PartnershipsStore";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuthStore } from "../../store/AuthStore";

const PartnershipCard = ({ logo, link, name, isLoading, showBorder, id }) => {
  const { deletePartnership } = usePartnershipsStore();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuthStore();
  if (isLoading) {
    return (
      <div className="w-[200px] h-[100px] rounded bg-gray-200 animate-pulse" />
    );
  }

  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await deletePartnership(id);
      setDeleteLoading(false);
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
    }
  };

  return (
    <Link
      to={link}
      target="_blank"
      className={`max-w-[100px] md:max-w-[200px] w-full h-fit relative group rounded ${
        showBorder && "border rounded p-4"
      }`}
    >
      {/** Deleting */}
      {deleteLoading && (
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 bg-gray-300 bg-opacity-35 flex justify-center items-center cursor-progress
        }`}
        >
          <div className="flex flex-col gap-2 items-center">
            <AiOutlineLoading className="size-7 animate-spin" />
            <p className="font-semibold text-slate-800">Deleting...</p>
          </div>
        </div>
      )}
      {/** Admin Only */}
      {user?.role === "admin" && !deleteLoading && (
        <div>
          <button
            className="hidden group-hover:inline-block p-2 bg-red-500 text-white rounded-full absolute top-1 right-1 z-20"
            onClick={() => handleDelete(id)}
          >
            <FaTrash />
          </button>
        </div>
      )}

      <div className="flex flex-col justify-center items-center">
        <img
          src={logo}
          alt={name}
          className="w-full h-[80px] md:h-[100px] object-contain "
        />
      </div>
    </Link>
  );
};
export default PartnershipCard;
