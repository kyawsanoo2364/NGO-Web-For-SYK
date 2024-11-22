import { FaPlus } from "react-icons/fa";
import AdminView from "../../hoc/AdminView";
import { memo, useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import PartnershipCard from "../../components/Cards/PartnershipCard";
import { usePartnershipsStore } from "../../store/PartnershipsStore";
import AddPartnershipModal from "../../components/Modal/AddPartnershipModal";

const AdminPartnershipsPage = () => {
  const { getPartnerships, partnerships } = usePartnershipsStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      await getPartnerships();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full p-2 ">
      {showModal && <AddPartnershipModal onClose={() => setShowModal(false)} />}
      <div className="border w-full h-full p-4">
        <h1 className="text-xl text-slate-800 font-bold uppercase">
          Partnerships
        </h1>
        <div className="my-4 flex items-center justify-between ">
          <button
            className="rounded-full bg-blue-500 text-white px-4 py-2 items-center flex gap-2"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Add
          </button>
          <button
            className="px-4 py-2 border rounded-full border-gray-200 text-slate-600 flex items-center gap-2 hover:bg-gray-100"
            onClick={() => fetchData()}
          >
            <IoMdRefresh />
            Refresh
          </button>
        </div>
        <div className="overflow-y-auto w-full h-[450px] flex flex-wrap gap-4 ">
          {isLoading ? (
            [...new Array(10)].map((_, idx) => (
              <PartnershipCard key={"partnership+" + idx} isLoading />
            ))
          ) : !partnerships || partnerships?.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center ">
              <div className="flex flex-col gap-2 items-center">
                <img
                  src="/partnership-icon.png"
                  className="mix-blend-multiply size-44"
                />
                <h2 className="text-lg text-slate-500 font-bold">
                  No Partnerships
                </h2>
              </div>
            </div>
          ) : (
            partnerships.map((p, idx) => (
              <PartnershipCard
                key={"Partnerships+" + idx}
                name={p.name}
                logo={p.imageUrl}
                link={p.webLink}
                showBorder
                id={p._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(AdminView(AdminPartnershipsPage));
