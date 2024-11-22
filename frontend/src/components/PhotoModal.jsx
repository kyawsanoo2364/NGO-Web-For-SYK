import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const PhotoModal = ({
  show,
  setShow,
  url,
  setUrl,
  imgIdx,
  setImgIdx,
  imgs,
}) => {
  useEffect(() => {
    setUrl(imgs[imgIdx].url);
  }, [imgIdx]);
  const onClickNext = () => {
    if (imgs.length - 1 > imgIdx) {
      setImgIdx(imgIdx + 1);
      setUrl(imgs[imgIdx].url);
      return;
    }
    setImgIdx(0);
    setUrl(imgs[imgIdx].url);
  };

  const onClickPrev = () => {
    if (imgIdx > 0) {
      setImgIdx(imgIdx - 1);

      setUrl(imgs[imgIdx].url);
    } else {
      setImgIdx(imgs.length - 1);
      setUrl(imgs[imgIdx].url);
    }
  };

  if (show)
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-gray-900 bg-opacity-40 z-50">
        <button
          className="absolute right-3 top-1/2 bg-gray-300 rounded-full p-2 flex items-center justify-center cursor-pointer z-20 hover:bg-gray-200"
          onClick={onClickNext}
        >
          <IoIosArrowForward className="size-10" />
        </button>
        <button
          className="absolute left-3 top-1/2 bg-gray-300 rounded-full p-2 flex items-center justify-center cursor-pointer z-20 hover:bg-gray-200"
          onClick={onClickPrev}
        >
          <IoIosArrowBack className="size-10" />
        </button>
        <div className="w-full h-full flex justify-center items-center relative">
          <div className="absolute top-10 right-2 lg:right-10">
            <button
              className="hover:bg-gray-300  hover:bg-opacity-40 rounded-full p-2"
              onClick={() => setShow(false)}
            >
              <IoMdClose className="size-10 text-white" />
            </button>
          </div>
          <div className="size-[600px] flex justify-center items-center">
            <img src={url} className="w-full h-auto " />
          </div>
        </div>
      </div>
    );
};
export default PhotoModal;
