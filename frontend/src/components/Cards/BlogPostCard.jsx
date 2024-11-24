import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { FaEdit, FaTrash } from "react-icons/fa";
import parser from "html-react-parser";
import CEBlogPostModal from "../Modal/CEBlogPostModal";
import { useState } from "react";
import { useBlogStore } from "../../store/BlogStore";
import { PiSpinner } from "react-icons/pi";
import ConfirmBox from "../ConfirmBox";
import { useAuthStore } from "../../store/AuthStore";
const BlogPostCard = ({
  img,
  title,
  time,
  description,
  linkTo,
  videoUrl,
  data,
  translate,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { deleteBlog } = useBlogStore();
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user } = useAuthStore();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteBlog(data._id);
      if (res) {
        setDeleteLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {showConfirmBox && (
        <ConfirmBox
          onCancel={() => setShowConfirmBox(false)}
          text={"Are you sure? You want to delete blog post."}
          onConfirm={() => {
            setShowConfirmBox(false);
            handleDelete();
          }}
        />
      )}
      {showEditModal && (
        <CEBlogPostModal
          isEdit
          onClose={() => setShowEditModal(false)}
          data={data}
        />
      )}
      <div className="group max-w-[80vw] px-4 w-full min-w-[80vw] lg:max-w-[672px] lg:min-w-[672px] p-4 shadow-lg  border rounded-md relative">
        {deleteLoading && (
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-300 bg-opacity-40 flex justify-center items-center gap-2 text-lg text-slate-700 font-semibold">
            <PiSpinner className="size-7 animate-spin" />
            <p className="animate-pulse">Deleting ...</p>
          </div>
        )}
        {user?.role === "admin" && (
          <>
            <button
              className="absolute group-hover:inline-block hidden  right-3 bg-red-500 text-white p-2 rounded-full"
              onClick={() => setShowConfirmBox(true)}
            >
              <FaTrash className="size-4" />
            </button>
            <button
              className="absolute group-hover:inline-block hidden  right-12 bg-green-500 text-white p-2 rounded-full"
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit className="size-4" />
            </button>
          </>
        )}
        <div className="flex flex-shrink-0 flex-col justify-center items-center md:flex-row gap-4">
          <div className="flex-[0.5] ">
            <div className="w-full h-full md:w-[200px] relative">
              <ReactPlayer
                url={videoUrl}
                width={"100%"}
                height={"100%"}
                controls
                light={
                  <img
                    src={img}
                    className="w-full md:w-[200px] h-full object-cover"
                  />
                }
              />
            </div>

            {/**<img src={img} className="w-full md:w-[200px] h-full object-cover" /> */}
          </div>
          <div className="flex-1">
            <h2 className="line-clamp-2 text-xl font-bold text-slate-800">
              {title}
            </h2>
            <div className="flex gap-2 flex-row items-center mt-1  text-gray-600">
              <GoClock />
              {time}
            </div>
            <div>
              <p className="line-clamp-4 text-slate-600 text-sm ">
                {parser(description)}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link
                to={linkTo}
                className="px-4 py-2 w-full text-center md:w-[150px] rounded-full bg-green-700 text-white mt-5 hover:bg-green-800"
              >
                {translate.readMore}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogPostCard;
