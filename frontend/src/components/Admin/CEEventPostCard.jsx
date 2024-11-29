import { FaUpload } from "react-icons/fa6";
import Input from "../Input";
import { useRef, useState } from "react";
import TextEditor from "../TextEditor";
import { useEventStore } from "../../store/EventStore";
import { CgSpinnerTwo } from "react-icons/cg";
import { motion } from "framer-motion";
import { languages } from "../../Languages.json";

const CEEventPostCard = ({ onClose, isEdit = false, data }) => {
  const inputFile = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(data?.image || null);
  const [description_en, setDescritpion_en] = useState(
    data?.description_en || ""
  );
  const [description_mm, setDescritpion_mm] = useState(
    data?.description_mm || ""
  );
  const [date, setDate] = useState(data?.date.split("T")[0]);
  const [time, setTime] = useState(data?.time);
  const [title_en, setTitle_en] = useState(data?.title_en || "");
  const [title_mm, setTitle_mm] = useState(data?.title_mm || "");
  const { createEvent, updateEvent } = useEventStore();
  const [location_en, setLocation_en] = useState(data?.location_en || "");
  const [location_mm, setLocation_mm] = useState(data?.location_mm || "");
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
          title_en,
          title_mm,
          description_en,
          description_mm,
          imageFile,
          location_en,
          location_mm,
          date,
          time,
          imageUrl: data.image,
          imageId: data.imageId,

          id: data._id,
        });
        if (res) {
          onClose();
          setIsLoading(false);
        }
      } else {
        const res = await createEvent({
          title_en,
          description_en,
          title_mm,
          description_mm,
          imageFile,
          location_en,
          location_mm,
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
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-slate-700">
            {isEdit ? "Edit Event" : "Create New Event"}
          </h1>
        </div>

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
              label={languages.en.title}
              placeholder={languages.en.enterTitle}
              value={title_en}
              onChange={(e) => setTitle_en(e.target.value)}
              required={true}
            />
            <Input
              label={languages.my.title}
              placeholder={languages.my.enterTitle}
              value={title_mm}
              onChange={(e) => setTitle_mm(e.target.value)}
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
              label={languages.en.location}
              inputType={"text"}
              value={location_en}
              onChange={(e) => setLocation_en(e.target.value)}
              placeholder={"Enter your event location"}
              required={true}
            />

            <Input
              label={languages.my.location}
              inputType={"text"}
              value={location_mm}
              onChange={(e) => setLocation_mm(e.target.value)}
              placeholder={languages.my.enterLocation}
              required={true}
            />

            <div className="my-5">
              <label>Description EN</label>
              <TextEditor
                style={{ margin: 0, marginTop: "10px" }}
                onChangeValue={(value) => setDescritpion_en(value)}
                content={description_en}
              />
            </div>

            <div className="my-5">
              <label>အကြောင်းအရာ MM</label>
              <TextEditor
                style={{ margin: 0, marginTop: "10px" }}
                onChangeValue={(value) => setDescritpion_mm(value)}
                content={description_mm}
              />
            </div>
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
