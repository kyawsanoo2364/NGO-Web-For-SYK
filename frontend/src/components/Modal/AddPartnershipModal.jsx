import { FaUpload } from "react-icons/fa";
import Input from "../Input";
import { useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { usePartnershipsStore } from "../../store/PartnershipsStore";

const AddPartnershipModal = ({ onClose }) => {
  const inputFileRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [webLink, setWebLink] = useState("");
  const { createPartnership } = usePartnershipsStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        setPreviewImage(result);
      };
      fileReader.readAsDataURL(selectedFile);
      setImageFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await createPartnership({ name, webLink, imageFile });
      if (res) {
        onClose();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30 z-20 flex justify-center items-center ${
        isLoading && "hover:cursor-progress"
      }`}
    >
      <div className="max-w-2xl w-full h-fit bg-white rounded p-4 shadow-md relative">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 z-10 bg-opacity-50 flex justify-center items-center gap-2 ">
            <ImSpinner2 className="text-slate-700 size-10 animate-spin" />
            <p className="text-slate-800">Uploading! Please wait...</p>
          </div>
        )}
        <h2 className="text-xl text-slate-700 font-bold">Add Partnership</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-2 p-2">
            <p className="text-slate-800">Logo</p>
            <div className="my-2 w-full h-[200px] relative">
              <div
                className="size-full absolute top-0 bottom-0 left-0 right-0 bg-gray-200 bg-opacity-35 flex justify-center items-center cursor-pointer"
                onClick={() => inputFileRef.current.click()}
              >
                <FaUpload className="size-10 text-slate-500" />
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
                required
              />
              <img className="size-full object-contain" src={previewImage} />
            </div>
            <Input
              label={"Name"}
              placeholder={"Enter partner name"}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <Input
              label={"Website"}
              placeholder={"Enter partner's website link"}
              onChange={(e) => setWebLink(e.target.value)}
              value={webLink}
              required
            />
          </div>
          <div className="my-2 flex justify-between items-center">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-200"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 hover:bg-blue-600 bg-blue-500 text-white rounded-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPartnershipModal;
