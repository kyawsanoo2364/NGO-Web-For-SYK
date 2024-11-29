import { useRef, useState } from "react";
import Input from "../Input";
import { FaUpload } from "react-icons/fa";
import TextEditor from "../TextEditor";
import { CgSpinnerAlt } from "react-icons/cg";
import { motion } from "framer-motion";
import { useEduProjectStore } from "../../store/EduProjectStore";
import { handlePromise } from "../../utils";
import { languages } from "../../Languages.json";

const CEEduProjectCardModal = ({ onClose, edit = false, data }) => {
  const inputFileRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(
    edit ? data?.logoImage : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { createProject, updateProject } = useEduProjectStore();
  const [form, setForm] = useState({
    title_en: edit ? data?.title_en : "",
    title_mm: edit ? data?.title_mm : "",
    description_en: edit ? data?.description_en : "",
    description_mm: edit ? data?.description_mm : "",
    logoImage: null,
    location_en: edit ? data?.location_en : "",
    location_mm: edit ? data?.location_mm : "",

    date: edit ? data?.date.split("T")[0] : "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        setPreviewImage(result);
      };
      fileReader.readAsDataURL(selectedFile);
      setForm({ ...form, logoImage: selectedFile });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      setIsLoading(true);
      const [err, res] = await handlePromise(
        updateProject(data._id, {
          title_en: form.title_en,
          description_en: form.description_en,
          title_mm: form.title_mm,
          description_mm: form.description_mm,
          date: form.date,
          logoImage: form.logoImage,
          location_en: form.location_en,
          location_mm: form.location_mm,
        })
      );
      if (err) {
        console.log(err);
        setIsLoading(false);
        return;
      }
      if (res) {
        setIsLoading(false);
        onClose();
        return;
      }
    } else {
      setIsLoading(true);
      const [err, res] = await handlePromise(
        createProject({
          title_en: form.title_en,
          description_en: form.description_en,
          title_mm: form.title_mm,
          description_mm: form.description_mm,
          date: form.date,
          logoImage: form.logoImage,
          location_en: form.location_en,
          location_mm: form.location_mm,
        })
      );
      if (err) {
        setIsLoading(false);
        console.log(err.message);
      }
      if (res) {
        setIsLoading(false);
        onClose();
      }
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="max-w-4xl p-4 bg-white w-full rounded relative">
        {isLoading && (
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-300 bg-opacity-35 z-20 flex items-center justify-center cursor-progress">
            <div className="flex flex-col justify-center items-center gap-3">
              <CgSpinnerAlt className="animate-spin size-7" />
              <p className="animate-bounce">Uploading...</p>
            </div>
          </div>
        )}
        <h2 className="text-xl font-bold text-slate-800">
          {edit ? "Edit Project" : "Create Project"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 max-h-[500px] overflow-y-auto p-2">
            <Input
              placeholder={"Enter Project Title"}
              label={"Title"}
              name={"title_en"}
              value={form.title_en}
              onChange={handleChange}
            />
            <Input
              placeholder={languages.my.enterTitle}
              label={languages.my.title}
              name={"title_mm"}
              value={form.title_mm}
              onChange={handleChange}
            />
            <Input
              label={"Date"}
              inputType={"date"}
              name={"date"}
              value={form.date}
              onChange={handleChange}
            />
            <Input
              label={"Location_en"}
              placeholder={"Enter location_en city or place name"}
              name={"location_en"}
              value={form.location_en}
              onChange={handleChange}
            />
            <Input
              label={languages.my.location}
              placeholder={languages.my.enterLocation}
              name={"location_mm"}
              value={form.location_mm}
              onChange={handleChange}
            />
            <label className="text-slate-800 font-semibold">Logo</label>
            <div className="my-3 w-full h-80 relative">
              <img
                className="w-full h-full object-contain"
                src={previewImage}
              />
              <div
                className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200 bg-opacity-60 flex justify-center items-center cursor-pointer z-20"
                onClick={() => inputFileRef.current.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                  name="logoImage"
                />
                <FaUpload className="size-14 text-gray-400 " />
              </div>
            </div>
            <div className="my-10 px-2">
              <label htmlFor="" className="mb-4">
                Description EN
              </label>
              <TextEditor
                style={{ margin: 0 }}
                content={form.description_en}
                onChangeValue={(value) =>
                  setForm({ ...form, description_en: value })
                }
              />
            </div>
            <div className="my-10 px-2">
              <label htmlFor="" className="mb-4">
                {languages.my.description} MM
              </label>
              <TextEditor
                style={{ margin: 0 }}
                content={form.description_mm}
                onChangeValue={(value) =>
                  setForm({ ...form, description_mm: value })
                }
              />
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <button
              className="px-4 py-2 border hover:bg-gray-100"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : edit ? "Update" : "Upload"}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CEEduProjectCardModal;
