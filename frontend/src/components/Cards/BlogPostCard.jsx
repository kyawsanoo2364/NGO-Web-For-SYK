import { GoClock } from "react-icons/go";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const BlogPostCard = ({ img, title, time, description, linkTo }) => {
  return (
    <div className=" max-w-[80vw] px-4 w-full min-w-[80vw] lg:max-w-[672px] lg:min-w-[672px] p-4 shadow-lg  border rounded-md ">
      <div className="flex flex-shrink-0 flex-col justify-center items-center md:flex-row gap-4">
        <div className="flex-[0.5] ">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
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
            <p className="line-clamp-4 text-slate-600 text-sm">{description}</p>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link
              to={linkTo}
              className="px-4 py-2 w-full text-center md:w-[150px] rounded-full bg-green-700 text-white mt-5 hover:bg-green-800"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPostCard;
