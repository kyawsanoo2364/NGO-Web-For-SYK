import { AdminView } from "../../hoc";
import { FaPlus } from "react-icons/fa6";
import { FaUsersSlash } from "react-icons/fa";
import StaffProfileCard from "../../components/Cards/StaffProfileCard";
import CEStaffModal from "../../components/Modal/CEStaffModal";
import { useEffect, useState } from "react";
import { useStaffStore } from "../../store/StaffStore";
import { handlePromise } from "../../utils";
import { memo } from "react";
import { IoMdRefresh } from "react-icons/io";

const AdminStaffsPage = () => {
  const [showCEModal, setShowCEModal] = useState(false);
  const { getStaffs, staffs } = useStaffStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const [err, res] = await handlePromise(getStaffs());
    if (err) {
      setIsLoading(false);
      console.log(err);
      return;
    }
    if (res) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full  p-2">
      <div className="border h-full w-full p-4">
        <h1 className="text-xl text-slate-700 font-bold">Our Staffs</h1>
        <div className="my-5 flex items-center justify-between">
          <button
            className="flex px-4 py-2 gap-2 items-center text-sm bg-blue-500 text-white font-semibold rounded-full"
            onClick={() => setShowCEModal(true)}
          >
            <FaPlus />
            ADD
          </button>
          <button
            className="px-4 py-2 border rounded-full border-gray-200 text-slate-600 flex items-center gap-2 hover:bg-gray-100"
            onClick={() => fetchData()}
          >
            <IoMdRefresh />
            Refresh
          </button>
        </div>
        {showCEModal && <CEStaffModal onClose={() => setShowCEModal(false)} />}
        {/** No member */}
        {staffs?.length === 0 && !isLoading ? (
          <div className="w-full h-full flex justify-center items-center -mt-20">
            <div className="flex flex-col gap-4 items-center">
              <FaUsersSlash className="size-16 text-slate-600" />
              <h4 className="text-slate-600 font-bold text-xl">
                No member yet.
              </h4>
            </div>
          </div>
        ) : (
          <div className="max-h-[450px] h-full w-full p-4 overflow-y-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {isLoading
              ? [...new Array(3)].map((_, idx) => (
                  <StaffProfileCard key={"staff+" + idx} isLoading />
                ))
              : staffs?.map((staff, idx) => (
                  <StaffProfileCard
                    key={"staff+" + idx}
                    name={staff.name}
                    img={staff.imageUrl}
                    fbLink={staff.facebookLink}
                    telegramLink={staff.telegramLink}
                    position={staff.position}
                    id={staff._id}
                    email={staff.email}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(AdminView(AdminStaffsPage));
