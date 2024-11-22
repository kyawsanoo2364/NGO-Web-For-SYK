import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import PhotoModal from "../components/PhotoModal";
import { useEffect, useState } from "react";
import Share from "../components/Share";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogStore } from "../store/BlogStore";
import parser from "html-react-parser";
import "../tiptap-tailwind.css";

const BlogPostDetails = () => {
  const currentUrl = window.location.href;
  const [imageShow, setImageShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageIdx, setImageIdx] = useState(0);
  const { getBlogDetails, blog, blogs } = useBlogStore();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    await getBlogDetails(id);
    setIsLoading(false);
  };

  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-2 lg:p-4 bg-slate-100">
        {/** Photo Modal */}
        {blog && (
          <PhotoModal
            show={imageShow}
            setShow={setImageShow}
            url={imageUrl}
            setUrl={setImageUrl}
            imgs={blog?.media}
            imgIdx={imageIdx}
            setImgIdx={setImageIdx}
          />
        )}
        <div className="container mx-auto">
          <div className="mt-20">
            <div className="flex flex-col lg:flex-row gap-4 ">
              {isLoading ? (
                <div className="flex-[0.7] flex-col gap-4 animate-pulse">
                  <div className="h-6 w-[400px] bg-gray-200 rounded-full mt-2" />
                  <div className="h-96 w-[700px] bg-gray-200 rounded mt-2" />
                  <div className="h-6 w-[300px] bg-gray-200 rounded-full mt-2" />
                  <div className="h-12 w-1/2 bg-gray-200 mt-2" />
                </div>
              ) : (
                <div className="flex-[0.7] border rounded">
                  <div className="w-full lg:p-4 ">
                    {/**Title */}
                    <h1 className="text-slate-800 font-bold text-balance text-xl my-5 px-1 ">
                      {blog?.title}
                    </h1>
                    {/**Media */}
                    <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] bg-black ">
                      {/**Video */}
                      <ReactPlayer
                        url={blog?.videoURL}
                        controls
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                    <div className="max-w-[850px] flex flex-row items-center justify-start overflow-x-auto mt-3 gap-4 px-4">
                      {/**Blog posts images */}
                      {blog?.media.map((img, idx) => (
                        <div
                          className="min-w-[200px] min-h-[150px] max-w-[200px] max-h-[150px] cursor-pointer"
                          key={"blogImage+" + idx}
                          onClick={() => {
                            setImageShow(true);
                            setImageUrl(img.url);
                            setImageIdx(idx);
                          }}
                        >
                          <img
                            src={img.url}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                    {/**Description Here */}
                    <div className="mt-4  px-2 select-none ProseMirror">
                      {blog && parser(blog?.description)}
                    </div>
                    {/** Share Social Media */}
                    <Share shareTitle={blog?.title} currentUrl={currentUrl} />
                  </div>
                </div>
              )}
              <div className="flex-[0.3]">
                <div className="w-full p-4 border mt-1  ">
                  <h2 className="font-semibold text-slate-700 text-lg">
                    Recent Activities
                  </h2>
                  {/** Other Activites */}
                  <div className="max-h-[400px] min-h-[400px] mt-3 flex flex-col gap-2 overflow-y-auto">
                    {/** Card */}
                    {blogs
                      ?.filter((b) => b._id !== blog?._id)
                      ?.map((b, idx) => (
                        <div
                          key={"blogcard+" + idx}
                          className=" w-full p-2 border"
                        >
                          <Link
                            to={`/blogs/${b._id}`}
                            className="flex flex-row gap-2"
                          >
                            <div className="flex-[0.4]">
                              <img
                                src={b.media[0].url}
                                alt=""
                                className="w-full h-[90px] object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[16px] font-semibold text-slate-700 line-clamp-1 hover:text-green-500">
                                {b.title}
                              </h3>
                              <p className="line-clamp-2 text-ellipsis text-sm text-slate-500">
                                {parser(b.description)}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                  <div className="flex flex-row justify-center mt-3">
                    <Link
                      className="border px-4 py-1 rounded-md text-blue-400 border-blue-400"
                      to={"/blogs"}
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BlogPostDetails;
