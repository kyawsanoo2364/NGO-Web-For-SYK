import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import Input from "../Input";
import { useHomeStore } from "../../store/HomeStore";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const { header, getHeader, updateHeader, isHeaderLoading } = useHomeStore();
  const [logoFile, setLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [companyName, setCompanyName] = useState(header?.companyName);
  const [binaryFile, setBinaryFile] = useState(null);

  useEffect(() => {
    getHeader();
  }, []);

  const handleLogoImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setLogoFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        // Get binary data from result
        const binary = reader.result;
        setPreviewLogo(binary);
        setBinaryFile(binary);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateHeaderButton = async () => {
    try {
      if (logoFile) {
        await updateHeader(binaryFile, companyName);
        toast.success("Updated header");
        setIsEdit(false);
      } else {
        await updateHeader(header?.logo, companyName);

        toast.success("Updated header");
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClipLogoEdit = () => {
    document.querySelector("#fileInput").click();
  };
  return (
    <div className="min-h-screen max-w-[300px] w-full p-2 ">
      <div className="w-full border h-full p-2 flex flex-col">
        {/**Header */}
        <div className="w-full  relative mb-10">
          {!isEdit && (
            <button
              className="absolute right-2"
              onClick={() => {
                setIsEdit(true);
                setCompanyName(header.companyName);
              }}
            >
              <MdEdit />
            </button>
          )}
          <div className="w-[100px] h-[80px] mx-auto mt-3 group cursor-pointer relative">
            <img
              src={previewLogo && isEdit ? previewLogo : header?.logo}
              alt=""
              className="w-full h-full object-contain"
            />
            <div className="hidden group-hover:inline-block w-full h-full absolute bg-gray-200 top-0 bg-opacity-10"></div>
            {isEdit && (
              <button
                className="absolute bottom-0 right-0 bg-gray-500 bg-opacity-50 p-2 rounded-full text-white"
                onClick={handleClipLogoEdit}
              >
                <MdEdit />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleLogoImageChange}
                />
              </button>
            )}
          </div>
          <div className="mt-3 w-full flex justify-center items-center text-center">
            {isEdit ? (
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            ) : (
              <h1 className="text-xl font-bold text-slate-700">
                {header?.companyName}
              </h1>
            )}
          </div>
          {isEdit && (
            <div className="mt-3 w-full flex justify-between items-center">
              <button
                className="px-4 py-2 border hover:bg-gray-200"
                onClick={() => {
                  setIsEdit(false);
                  setPreviewLogo(null);
                  setCompanyName(header?.companyName);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded hover:bg-green-700 bg-green-600 text-white"
                onClick={updateHeaderButton}
                disabled={isHeaderLoading}
              >
                {isHeaderLoading ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-[1px] bg-slate-200" />
        <div
          className={`w-full mt-5 flex flex-col gap-4 ${
            isEdit ? "max-h-[280px]" : "max-h-[380px]"
          }  overflow-auto custom-scrollbar`}
        >
          <Link
            to={"/admin/dashboard"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Home
          </Link>
          <Link
            to={"/admin/dashboard/users"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Users
          </Link>
          <Link
            to={"/admin/dashboard/eventLists"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Events
          </Link>
          <Link
            to={"/admin/dashboard/blogs"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Blogs
          </Link>
          <Link
            to={"/admin/dashboard/projects"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Projects
          </Link>
          <Link
            to={"/admin/dashboard/staffs"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Staffs
          </Link>
          <Link
            to={"/admin/dashboard/partnerships"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Partnerships
          </Link>
          <Link
            to={"/admin/dashboard/privacy-policy"}
            className="text-slate-600 text-start px-4 rounded text-lg font-semibold w-full py-2 hover:bg-gray-100 "
          >
            Privacy Policy
          </Link>
        </div>
        <div className="absolute bottom-4 font-semibold text-slate-300 text-sm select-none">
          Developed By Kyaw San Oo
        </div>
      </div>
    </div>
  );
};
export default AdminNavbar;
