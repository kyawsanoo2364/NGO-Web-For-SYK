import ReactPlayer from "react-player";

const ActivityVideo = ({ videoUrl }) => {
  return (
    <div className="flex justify-center items-center bg-black">
      <div className="h-1 bg-slate-700" />
      <ReactPlayer url={videoUrl} width={"1024px"} height={"720px"} controls />
      <div className="h-1 bg-slate-700" />
    </div>
  );
};
export default ActivityVideo;
