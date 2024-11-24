import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { useHomeStore } from "../store/HomeStore";
import { detectedLanguage } from "../utils";
import { useEffect, useState } from "react";
import { useLanguage } from "../store/LanguageStore";

const Footer = () => {
  const { homeInfo, header } = useHomeStore();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  return (
    <>
      <footer className="p-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1  gap-4 md:grid-cols-3  lg:grid-cols-4 mt-10 mb-10">
            <Link
              to={"/"}
              className="flex flex-col justify-center items-center gap-3"
            >
              <img
                src={header?.logo}
                alt=""
                className="size-[80px] object-contain rounded"
              />
              <h2 className="text-lg text-white font-bold ">
                {header?.companyName}
              </h2>
            </Link>
            {/**About us */}
            <div className="flex flex-col justify-center items-center gap-2 text-center text-pretty">
              <h2 className="text-lg font-semibold text-gray-100">
                {translate.aboutUs}
              </h2>
              <p className="text-slate-400 text-sm ">{homeInfo?.about}</p>
            </div>
            {/**Quick links */}
            <div className="flex flex-col justify-center items-center gap-2 text-center text-gray-200">
              <h2 className="text-lg font-semibold text-gray-200">
                {translate.quickLinks}
              </h2>
              <a href="/">{translate.home}</a>
              <a href="/blogs">{translate.blogs}</a>
              <a href="/events">{translate.events}</a>

              {/**<button>Donate</button>
              <a href="/login">Sign in</a>*/}
            </div>
            {/**Contacts */}
            <div className="flex flex-col  gap-2 text-center items-center text-gray-200">
              <h2 className="text-lg font-semibold text-gray-200 text-center">
                {translate.contacts}
              </h2>
              <p className="flex items-center gap-2 ">
                <MdOutlineEmail className="size-6" />
                {homeInfo?.contacts?.email}
              </p>
              <p className="flex items-center gap-4">
                <FaPhoneAlt className="size-5" />
                {homeInfo?.contacts?.phone}
              </p>
              <div className="mt-4 flex gap-2 justify-center items-center">
                <a href={homeInfo?.contacts.facebook} target="_blank">
                  <FaFacebook className="size-6 text-blue-500 bg-white rounded-full" />
                </a>
                <a href={homeInfo?.contacts?.telegram} target="_blank">
                  <FaTelegram className="size-6 text-blue-400 bg-white rounded-full" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center  justify-center">
            <div className="w-[80%] h-[1px] bg-gray-600 "></div>
            <div className="flex mt-5">
              {" "}
              <p className="text-gray-400 text-center">
                &copy; 2024 Show Your Kindness. All rights reserved. Developed
                By Kyaw San Oo.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
