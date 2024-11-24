import { Link } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { FiLogOut } from "react-icons/fi";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useHomeStore } from "../store/HomeStore";
import LanguageDropdown from "./LanguageDropdown";
import { detectedLanguage } from "../utils";
import { useLanguage } from "../store/LanguageStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { header } = useHomeStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  return (
    <nav className="max-w-full bg-slate-700 text-white   py-2 font-sans backdrop-filter backdrop-blur-lg bg-opacity-30 fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center gap-4">
            <img
              src={header?.logo}
              alt=""
              className="size-10 md:size-14 rounded-sm"
            />
            <h1 className="lg:hidden block text-xl md:text-2xl font-bold">
              {header?.companyName}
            </h1>
          </Link>
          {/** Desktop version */}
          <div className="hidden lg:flex items-center gap-4 ml-10">
            <a
              href="/"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              }  hover:font-semibold`}
            >
              {translate.home}
            </a>
            <a
              href="/#about-us"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              } hover:font-semibold`}
            >
              {translate.aboutUs}
            </a>
            <a
              href="/#partnerships"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              }  hover:font-semibold`}
            >
              {translate.partnerships}
            </a>
            <Link
              to={"/blogs"}
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              } hover:font-semibold`}
            >
              {translate.blogs}
            </Link>
            <Link
              to="/events"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              }  hover:font-semibold`}
            >
              {translate.events}
            </Link>
            <a
              href="/#projects"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              }  hover:font-semibold`}
            >
              {translate.projects}
            </a>
            <a
              href="#"
              className={`${
                language === "Myanmar" ? "text-[12px]" : "text-[16px]"
              }  hover:font-semibold`}
            >
              {translate.contactUs}
            </a>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LanguageDropdown />

            {/** 
            <Link to={"/login"} className="px-4 py-2">
              Sign in
            </Link>
            */}
            {user?.isVerified && (
              <>
                {user?.role === "admin" && (
                  <Link to={"/admin/dashboard"} className="px-4 py-2">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  className="text-white hover:bg-red-600 bg-red-500 rounded-lg py-1 px-3"
                  onClick={() => logout()}
                >
                  <FiLogOut className="size-6 " />
                </button>
              </>
            )}
          </div>
        </div>
        {/**Mobile version */}
        <div className="inline-block lg:hidden">
          <button className="mt-1 p-1" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? (
              <IoClose className="size-8" />
            ) : (
              <IoMenuOutline className="size-8 " />
            )}
          </button>
        </div>
      </div>
      {/**Mobile Version */}
      {showMenu && (
        <div className="lg:hidden  w-full p-4 flex flex-col gap-4 text-xl">
          <a
            href="/"
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Home
          </a>
          <a
            href="/#about-us"
            className="hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            About us
          </a>
          <a
            href="/#partnerships"
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Partnership
          </a>
          <Link
            to={"/blogs"}
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Blogs
          </Link>
          <Link
            to="/events"
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Events
          </Link>
          <a
            href="/#projects"
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Projects
          </a>
          <a
            href="#"
            className=" hover:font-semibold "
            onClick={() => setShowMenu(false)}
          >
            Contacts
          </a>
          <Link to={"/login"} onClick={() => setShowMenu(false)}>
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
