import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { FiLogOut } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <nav className="max-w-full bg-slate-700 text-white   py-2 font-sans backdrop-filter backdrop-blur-lg bg-opacity-30 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center gap-4">
            <img
              src="/syk.jpg"
              alt=""
              className="size-10 md:size-14 rounded-sm"
            />
            <h1 className="lg:hidden block text-lg md:text-2xl font-bold">
              Show Your Kindness
            </h1>
          </Link>
          {/** Desktop version */}
          <div className="hidden lg:flex items-center gap-4 ml-10">
            <a href="/" className="text-[16px] hover:font-semibold ">
              Home
            </a>
            <a href="/#about-us" className="text-[16px] hover:font-semibold ">
              About us
            </a>
            <a
              href="/#partnerships"
              className="text-[16px] hover:font-semibold "
            >
              Partnership
            </a>
            <Link to={"/blogs"} className="text-[16px] hover:font-semibold ">
              Blogs
            </Link>
            <Link to="/events" className="text-[16px] hover:font-semibold ">
              Events
            </Link>
            <a href="/#projects" className="text-[16px] hover:font-semibold ">
              Projects
            </a>
            <a href="#" className="text-[16px] hover:font-semibold ">
              Contacts
            </a>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="px-4 hover:bg-pink-600 py-2 rounded-lg bg-pink-500 text-white">
              Donate Now
            </button>
            {/* {user?.isVerified ? (
              <button
                className="text-white hover:bg-red-600 bg-red-500 rounded-lg py-1 px-3"
                onClick={() => logout()}
              >
                <FiLogOut className="size-6 " />
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="px-4 py-2 rounded-lg hover:font-bold"
                >
                  Sign in
                </Link>
                <Link
                  to={"/signup"}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg  hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )} */}
          </div>
        </div>
        {/**Mobile version */}
        <div className="inline-block lg:hidden">
          <button className="mt-1 p-1">
            <IoMenuOutline className="size-8 " />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
