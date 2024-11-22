import { AdminView } from "../../hoc";
import { memo } from "react";

const AdminBlogs = () => {
  const currentDomain = window.location.origin;
  return (
    <div className="min-h-screen w-full p-2">
      <div className="w-full h-full borderrounded main-box-shadow">
        <iframe src={currentDomain + "/blogs"} className="w-full h-full" />
      </div>
    </div>
  );
};
export default memo(AdminView(AdminBlogs));
