import { BiImageAdd } from "react-icons/bi";
import Input from "../Input";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import TextEditor from "../TextEditor";
import { useBlogStore } from "../../store/BlogStore";
import { FaSpinner } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { languages } from "../../Languages.json";

const CEBlogPostModal = ({ onClose, isEdit = false, data }) => {
  const inputFileRef = useRef(null);

  const [previewImages, setPreviewImages] = useState(isEdit ? data?.media : []);
  const { createBlog, updateBlog } = useBlogStore();
  const [title_en, setTitle_en] = useState(isEdit ? data?.title_en : "");
  const [description_en, setDescritpion_en] = useState(
    isEdit ? data?.description_en : ""
  );
  const [title_mm, setTitle_mm] = useState(isEdit ? data?.title_mm : "");
  const [description_mm, setDescritpion_mm] = useState(
    isEdit ? data?.description_mm : ""
  );
  const [videoURL, setVideoURL] = useState(isEdit ? data?.videoURL : "");
  const [isLoading, setIsLoading] = useState(false);
  const [trash, setTrash] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const result = fileReader.result;
        setPreviewImages([
          ...previewImages,
          { file: selectedFile, url: result },
        ]);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageFiles = [];
    let media = previewImages;
    if (isEdit) {
      for (let i = 0; i < previewImages.length; i++) {
        if (previewImages[i].file) {
          imageFiles.push(previewImages[i].file);
          media = media.filter((m) => m !== previewImages[i]);
        }
      }

      try {
        setIsLoading(true);
        const res = await updateBlog(data._id, {
          title_en,
          title_mm,
          description_en,
          description_mm,
          videoURL,
          imageFiles,
          media: media,
          removeImagesId: trash,
        });
        if (res) {
          setIsLoading(false);
          onClose();
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      for (const data of previewImages) {
        imageFiles.push(data.file);
      }

      try {
        setIsLoading(true);
        const response = await createBlog({
          title_en,
          title_mm,
          description_en,
          description_mm,
          videoURL,
          imageFiles,
        });
        if (response) {
          setIsLoading(false);
          onClose();
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 z-30 flex justify-center items-center p-2">
      <div className="max-w-3xl w-full max-h-[500px] h-full bg-white mt-20 relative">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-50 z-30 flex items-center justify-center text-slate-600 text-xl font-semibold gap-4 cursor-progress">
            <FaSpinner className="size-6 animate-spin" />
            <div className="animate-bounce">
              {isEdit ? "Updating..." : "Uploading..."}{" "}
            </div>
          </div>
        )}
        <h1 className="text-xl text-slate-800 font-bold p-4">
          {isEdit ? "Edit Post" : "Create Post"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 p-4 overflow-y-auto max-h-[370px]">
            <Input
              label={"Title"}
              placeholder={"Enter title"}
              value={title_en}
              required
              onChange={(e) => setTitle_en(e.target.value)}
            />
            <Input
              label={languages.my.title}
              placeholder={languages.my.enterTitle}
              value={title_mm}
              required
              onChange={(e) => setTitle_mm(e.target.value)}
            />
            <Input
              label={"Video URL"}
              placeholder={"https://youtube.com/akdfj"}
              value={videoURL}
              required
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <label className="text-lg text-slate-700 mb-2">Media</label>
            <div
              className="flex justify-center items-center w-full h-48 bg-gray-200 cursor-pointer"
              onClick={() => inputFileRef.current.click()}
            >
              <BiImageAdd className="size-10 text-slate-500" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
            </div>
            {/**Preview Images */}
            <div className="w-full flex items-start overflow-x-auto mt-1 mb-2 gap-3">
              {previewImages?.map((preview, idx) => (
                <div
                  key={"image+" + idx}
                  className="min-w-[150px] min-h-[100px]  max-h-[100px] max-w-[150px] relative"
                >
                  <button
                    className="absolute right-0 top-0 p-2 bg-gray-300 bg-opacity-60 rounded-full"
                    type="button"
                    onClick={() => {
                      setPreviewImages(
                        previewImages.filter((i) => i !== preview)
                      );
                      if (!preview.file) {
                        setTrash([...trash, preview.id]);
                      }
                    }}
                  >
                    <IoMdClose className="text-slate-800" />
                  </button>
                  <img
                    className="w-full h-[100px] object-contain"
                    src={preview.url}
                  />
                </div>
              ))}
            </div>
            <div className="p-2 w-full overflow-hidden my-5">
              <label>Description_EN</label>
              <TextEditor
                style={{ margin: 0 }}
                onChangeValue={(value) => setDescritpion_en(value)}
                content={description_en}
                required
              />
            </div>
            <div className="p-2 w-full overflow-hidden my-5">
              <label>Description_MM</label>
              <TextEditor
                style={{ margin: 0 }}
                onChangeValue={(value) => setDescritpion_mm(value)}
                content={description_mm}
                required
              />
            </div>
          </div>
          <div className="mt-2 mx-4 flex justify-between items-center">
            <button
              className="border px-4 py-2 rounded hover:bg-gray-200"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white rounded px-4 py-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : isEdit ? "Update" : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CEBlogPostModal;
