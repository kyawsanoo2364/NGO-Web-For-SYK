import { AdminView } from "../../hoc";
import { MdOutlinePrivacyTip } from "react-icons/md";
import "../../tiptap-tailwind.css";
import { FaRegEdit } from "react-icons/fa";
import { memo, useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor";
import { usePrivacyStore } from "../../store/PrivacyStore";
import parser from "html-react-parser";
import { CgSpinner } from "react-icons/cg";

const AdminPrivacyPolicy = () => {
  const [privacyInput, setPrivacyInput] = useState("");
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const { updatePrivacy, privacyPolicy, getPrivacy } = usePrivacyStore();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getPrivacy();
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsUpdateLoading(true);
      await updatePrivacy(privacyPolicy?._id, {
        content: privacyInput,
      });
      setIsUpdateLoading(false);
      setIsEdit(false);
    } catch (error) {
      setIsUpdateLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-full p-2">
      <div className="h-full w-full border rounded p-4 relative">
        {isUpdateLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-300 bg-opacity-40 z-20 text-slate-800 font-semibold gap-2 cursor-progress">
            <CgSpinner className="size-7 animate-spin" />
            Updating...Please wait!
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-slate-800 font-bold flex gap-2 items-center">
            <MdOutlinePrivacyTip className="size-7" />
            Privacy Policy
          </h1>
          {!isEdit && (
            <button
              className="flex gap-2 items-center"
              onClick={() => {
                setIsEdit(true);
                setPrivacyInput(privacyPolicy?.content);
              }}
            >
              <FaRegEdit className="size-5" />
              Edit
            </button>
          )}
        </div>

        <div className=" max-h-[550px] w-full overflow-y-auto border h-full p-4 ProseMirror">
          {isEdit ? (
            <TextEditor
              height={"400px"}
              content={privacyInput}
              onChangeValue={(value) => setPrivacyInput(value)}
            />
          ) : (
            privacyPolicy && parser(privacyPolicy?.content)
          )}
        </div>
        {isEdit && (
          <div className="flex justify-between items-center -mt-5 mx-5">
            <button
              className="px-4 py-2 border hover:bg-gray-200 rounded"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleUpdate()}
              disabled={isUpdateLoading}
            >
              {isUpdateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(AdminView(AdminPrivacyPolicy));
