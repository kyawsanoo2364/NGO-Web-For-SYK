import { IoMdClose } from "react-icons/io";
import Input from "../Input";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useRef, useState } from "react";
import { useStaffStore } from "../../store/StaffStore";
import { VscLoading } from "react-icons/vsc";

const CEStaffModal = ({ onClose, isEdit = false, data }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { createStaff } = useStaffStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
      setImageFile(selectedFile);
    }
  };
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEdit) {
        setIsLoading(true);
        const res = await createStaff({
          name,
          email,
          imageFile,
          facebookLink,
          telegramLink,
          position,
        });
        if (res) {
          setIsLoading(false);
          onClose();
        }
      } else {
        return null;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-20 z-30">
      <div className="max-w-lg w-full h-[500px]  bg-white rounded p-4 shadow-lg relative">
        {isLoading && (
          <div className="w-full h-full z-20 bg-gray-300 bg-opacity-40 absolute top-0 left-0 right-0 bottom-0" />
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-slate-700 font-bold text-xl">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>
          <button onClick={onClose}>
            <IoMdClose className="size-6 text-slate-800" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="max-h-[400px] h-full w-full p-4 mt-1 overflow-auto ">
            <div className="my-4 w-full h-[200px] relative">
              {previewImage && (
                <img
                  src={previewImage}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
              <div
                className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-30 flex justify-center items-center cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  required
                />
                <MdOutlineAddPhotoAlternate className="size-10 text-slate-500" />
              </div>
            </div>
            <Input
              placeholder={"Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              inputType={"email"}
              placeholder={"Enter Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              inputType={"text"}
              placeholder={"Position"}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <Input
              placeholder={"Telegram Account Link"}
              inputType={"url"}
              value={telegramLink}
              onChange={(e) => setTelegramLink(e.target.value)}
              required
            />
            <Input
              placeholder={"Facebook Account Link"}
              inputType={"url"}
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              required
            />
          </div>
          <button
            className="px-4 py-2 w-full bg-blue-500 text-white rounded-full"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-4 justify-center">
                <VscLoading className="animate-spin size-5" />
                Uploading..
              </div>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CEStaffModal;
