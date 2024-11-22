import { FaUpload } from "react-icons/fa6";
import Input from "../Input";
import { useEffect, useRef, useState } from "react";
import TextEditor from "../TextEditor";
import { useEventStore } from "../../store/EventStore";
import { CgSpinnerTwo } from "react-icons/cg";
import { motion } from "framer-motion";

const CEEventPostCard = ({ onClose, isEdit = false, data }) => {
  const inputFile = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(data?.img);
  const [description, setDescritpion] = useState(data?.description);
  const [date, setDate] = useState(data?.date.split("T")[0]);
  const [time, setTime] = useState(data?.time);
  const [title, setTitle] = useState(data?.title);
  const { createEvent, updateEvent } = useEventStore();
  const [location, setLocation] = useState(data?.location);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (isEdit) {
        const res = await updateEvent({
          title,
          description,
          imageFile,
          location,
          date,
          time,
          imageUrl: data.imageUrl,
          imageId: data.imageId,

          id: data.id,
        });
        if (res) {
          onClose();
          setIsLoading(false);
        }
      } else {
        const res = await createEvent({
          title,
          description,
          imageFile,
          location,
          date,
          time,
        });
        if (res) {
          setIsLoading(false);
          onClose();
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-40 bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="max-w-[800px] w-full h-full max-h-[600px] bg-white rounded-md p-4 relative">
        <h1 className="text-2xl font-bold text-slate-700">
          {isEdit ? "Edit Event" : "Create New Event"}
        </h1>
        {isLoading && (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center z-40 bg-gray-300 bg-opacity-40 text-xl text-slate-700 font-semibold gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              <CgSpinnerTwo className="size-6" />
            </motion.div>
            {isEdit
              ? "Please wait.Updating..."
              : " Please wait.Creating Event...."}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="w-full max-h-[480px] h-full p-2 mt-5 overflow-y-auto">
            <div className="w-full h-[400px] my-3 relative">
              <div
                className="w-full h-full absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-pointer"
                onClick={() => inputFile.current.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputFile}
                  onChange={handleFileChange}
                />
                <FaUpload className="size-20 text-gray-100 opacity-50" />
              </div>
              <img
                src={previewImage}
                alt=""
                className="w-full h-full rounded object-cover"
              />
            </div>

            <Input
              label={"Title"}
              placeholder={"Enter Event Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
            <Input
              label={"Date"}
              inputType={"date"}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            />
            <Input
              label={"Time"}
              inputType={"time"}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required={true}
            />
            <Input
              label={"Location"}
              inputType={"text"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={"Enter your event location"}
              required={true}
            />
            <TextEditor
              onChangeValue={(value) => setDescritpion(value)}
              content={data?.description}
            />
          </div>
          <div className="flex justify-between w-full px-4">
            <button
              type="button"
              className="px-4 py-2 border "
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded"
              disabled={isLoading}
            >
              {isLoading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CEEventPostCard;
