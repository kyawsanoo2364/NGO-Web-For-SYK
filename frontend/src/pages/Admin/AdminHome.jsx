import { useEffect, useRef, useState } from "react";
import { AdminView } from "../../hoc";
import {
  FaFacebook,
  FaFacebookF,
  FaImage,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Input from "../../components/Input";
import { FaUpload } from "react-icons/fa";
import ReactPlayer from "react-player";
import { MdOutlineMail } from "react-icons/md";
import { useHomeStore } from "../../store/HomeStore";
import { ImSpinner9 } from "react-icons/im";
import { motion } from "framer-motion";
import { memo } from "react";

const AdminHome = () => {
  const contactBgInput = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const {
    isHomeLoading,
    getHomeInfo,
    homeInfo,
    updateHomePage,
    isHomeUpdateLoading,
  } = useHomeStore();
  const [heroTitle_en, setHeroTitle_en] = useState(homeInfo?.hero.title);
  const [heroSubTitle_en, setHeroSubTitle_en] = useState("");
  const [previewBg, setPreviewBg] = useState(null);
  const [about_en, setAbout_en] = useState(null);
  const [mission_en, setMission_en] = useState("");
  const [vision_en, setVision_en] = useState("");
  const [activityVideoURL, setActivityVideoURL] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [telegram, setTelegram] = useState("");
  const [file, setFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  //Myanmar version
  const [heroTitle_mm, setHeroTitle_mm] = useState("");
  const [heroSubTitle_mm, setHeroSubTitle_mm] = useState("");
  const [about_mm, setAbout_mm] = useState("");
  const [mission_mm, setMission_mm] = useState("");
  const [vision_mm, setVision_mm] = useState("");
  const [previewContactBg, setPreviewContactBg] = useState(homeInfo?.contactBg);

  const handleBgImageClick = () => {
    document.querySelector("#bgImage").click();
  };

  const handleBgImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const binary = reader.result;
        setPreviewBg(binary);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleContactBgChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const binary = reader.result;
        setPreviewContactBg(binary);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditButtonClick = () => {
    setIsEdit(true);
    setHeroTitle_en(homeInfo?.hero.title_en);
    setHeroSubTitle_en(homeInfo?.hero.subTitle_en);
    setAbout_en(homeInfo?.about_en);
    setMission_en(homeInfo?.mission_en);
    setVision_en(homeInfo?.vision_en);
    setHeroTitle_mm(homeInfo?.hero.title_mm);
    setHeroSubTitle_mm(homeInfo?.hero.subTitle_mm);
    setAbout_mm(homeInfo?.about_mm);
    setMission_mm(homeInfo?.mission_mm);
    setVision_mm(homeInfo?.vision_mm);
    setActivityVideoURL(homeInfo?.activityVideoUrl);
    setEmail(homeInfo?.contacts.email);
    setPhone(homeInfo?.contacts.phone);
    setFacebook(homeInfo?.contacts.facebook);
    setTelegram(homeInfo?.contacts.telegram);
    setPreviewBg(homeInfo?.contactBg);
  };

  const handleSaveButton = async () => {
    try {
      const res = await updateHomePage({
        heroTitle_en,
        heroDescription_en: heroSubTitle_en,
        heroTitle_mm,
        heroDescription_mm: heroSubTitle_mm,
        bgFile: file,
        heroBackgroundImage: homeInfo.hero.backgroundImage,
        activityVideoUrl: activityVideoURL,
        about_en,
        vision_en,
        mission_en,
        about_mm,
        vision_mm,
        mission_mm,
        phone,
        email,
        facebook,
        telegram,
        contactBg: previewContactBg,
      });
      if (res) {
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full p-2">
      <div className="w-full h-full border relative">
        {isHomeUpdateLoading && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-50 z-30 w-full h-full flex justify-center items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            >
              <ImSpinner9 className="size-10 text-green-500" />
            </motion.div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-slate-800 font-semibold p-6">Home</h1>
          {!isEdit && (
            <button
              className="flex items-center justify-center mx-6 p-4 rounded-full hover:bg-gray-100 hover:bg-opacity-50"
              onClick={handleEditButtonClick}
            >
              <FaEdit className="size-6 text-slate-600" />
            </button>
          )}
        </div>
        <div className="flex justify-end items-center mb-5 -mt-3 mx-4">
          <button
            onClick={() => setSelectedLanguage("EN")}
            className={`px-4 py-2 border rounded ${
              selectedLanguage === "EN" ? " bg-orange-500 text-white" : ""
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setSelectedLanguage("MM")}
            className={`px-4 py-2 border rounded  ${
              selectedLanguage === "MM" ? " bg-orange-500 text-white" : ""
            }`}
          >
            MM
          </button>
        </div>
        {/** Edit Section */}
        <div className="max-h-[480px] h-full w-full p-4 overflow-y-auto relative">
          {/**Loading */}

          {/**Hero Section */}

          <div>
            <h2 className="text-xl font-bold text-slate-700">Hero Section</h2>
            <h3 className="text-lg font-semibold text-slate-700 mt-2">Title</h3>
            {isEdit ? (
              selectedLanguage === "MM" ? (
                <Input
                  value={heroTitle_mm}
                  onChange={(e) => setHeroTitle_mm(e.target.value)}
                />
              ) : (
                <Input
                  value={heroTitle_en}
                  onChange={(e) => setHeroTitle_en(e.target.value)}
                />
              )
            ) : (
              <h4 className="text-lg font-semibold text-slate-700 mt-2 border p-4 line-clamp-1">
                {selectedLanguage === "EN"
                  ? homeInfo?.hero.title_en
                  : homeInfo?.hero.title_mm}
              </h4>
            )}
            <h2 className="mt-2 text-lg font-semibold text-slate-700">
              Sub Title
            </h2>
            {isEdit ? (
              selectedLanguage === "EN" ? (
                <textarea
                  className="w-full p-4 outline-none border"
                  rows={2}
                  value={heroSubTitle_en}
                  onChange={(e) => setHeroSubTitle_en(e.target.value)}
                />
              ) : (
                <textarea
                  className="w-full p-4 outline-none border"
                  rows={2}
                  value={heroSubTitle_mm}
                  onChange={(e) => setHeroSubTitle_mm(e.target.value)}
                />
              )
            ) : (
              <h4 className="text-lg font-semibold text-slate-700 mt-2 border p-4 line-clamp-2">
                {selectedLanguage === "EN"
                  ? homeInfo?.hero.subTitle_en
                  : homeInfo?.hero.subTitle_mm}
              </h4>
            )}
            <h2 className="mt-4 text-lg font-semibold text-slate-700">
              Background Cover
            </h2>
            <div className="border w-full h-[200px] mt-5 relative">
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50"></div>
              {isEdit ? (
                <div
                  className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center cursor-pointer"
                  onClick={handleBgImageClick}
                >
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    id="bgImage"
                    onChange={handleBgImageChange}
                  />
                  <FaUpload className="size-20 text-slate-200 opacity-35" />
                </div>
              ) : (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                  <FaImage className="size-20 text-slate-200 opacity-35" />
                </div>
              )}
              <img
                src={previewBg ? previewBg : homeInfo?.hero.backgroundImage}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/**About_en Section */}
          <div className="mt-4">
            <h1 className="text-slate-700 font-bold text-xl">About</h1>
            <h2 className="text-slate-700 font-semibold text-lg mt-2">
              Who we are
            </h2>
            {isEdit ? (
              selectedLanguage === "EN" ? (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={about_en}
                  onChange={(e) => setAbout_en(e.target.value)}
                ></textarea>
              ) : (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={about_mm}
                  onChange={(e) => setAbout_mm(e.target.value)}
                ></textarea>
              )
            ) : (
              <h3 className="mt-2 text-slate-700">
                {selectedLanguage === "EN"
                  ? homeInfo?.about_en
                  : homeInfo?.about_mm}
              </h3>
            )}
            <h2 className="text-slate-700 font-semibold text-lg mt-2">
              Our mission
            </h2>
            {isEdit ? (
              selectedLanguage === "EN" ? (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={mission_en}
                  onChange={(e) => setMission_en(e.target.value)}
                ></textarea>
              ) : (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={mission_mm}
                  onChange={(e) => setMission_mm(e.target.value)}
                ></textarea>
              )
            ) : (
              <h3 className="mt-2 text-slate-700">
                {selectedLanguage === "EN"
                  ? homeInfo?.mission_en
                  : homeInfo?.mission_mm}
              </h3>
            )}
            <h2 className="text-slate-700 font-semibold text-lg mt-2">
              Our vision
            </h2>
            {isEdit ? (
              selectedLanguage === "EN" ? (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={vision_en}
                  onChange={(e) => setVision_en(e.target.value)}
                ></textarea>
              ) : (
                <textarea
                  rows={5}
                  className="mt-2 w-full p-4 outline-none border"
                  value={vision_mm}
                  onChange={(e) => setVision_mm(e.target.value)}
                ></textarea>
              )
            ) : (
              <h3 className="mt-2 text-slate-700">
                {selectedLanguage === "EN"
                  ? homeInfo?.vision_en
                  : homeInfo?.vision_mm}
              </h3>
            )}
          </div>
          {/**Activity Main Video */}
          <div className="mt-4">
            <h1 className="text-slate-700 font-bold text-xl mb-4">
              Activity Video
            </h1>
            {isEdit ? (
              <Input
                placeholder={"https://www.youtube.com"}
                value={activityVideoURL}
                onChange={(e) => setActivityVideoURL(e.target.value)}
              />
            ) : (
              <ReactPlayer
                height={"400px"}
                width={"100%"}
                url={homeInfo?.activityVideoUrl}
                controls
              />
            )}
          </div>
          {/**Contact */}
          <div className="mt-4">
            <h1 className="text-slate-700 font-bold text-xl">Contacts</h1>

            {isEdit ? (
              <>
                <h2 className="text-slate-600 font-semibold text-lg mt-3">
                  Your Email
                </h2>
                <Input
                  placeholder={"Enter Your Email Address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <h4 className="flex items-center gap-2 text-slate-700 mt-3">
                <MdOutlineMail className="size-6" /> {homeInfo?.contacts.email}
              </h4>
            )}

            {isEdit ? (
              <>
                <h2 className="text-slate-600 font-semibold text-lg mt-3">
                  Your Phone Number
                </h2>
                <Input
                  placeholder={"Enter Your Email Address"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            ) : (
              <h4 className="flex items-center gap-2 text-slate-700 mt-3">
                <FaPhone className="size-4" /> {homeInfo?.contacts.phone}
              </h4>
            )}
            {isEdit ? (
              <>
                <h2 className="text-slate-600 font-semibold text-lg mt-3">
                  Facebook Link
                </h2>
                <Input
                  placeholder={"https://www.facebook.com"}
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </>
            ) : (
              <h4 className="flex items-center gap-2 text-slate-700 mt-3">
                <FaFacebook className="size-6" /> {homeInfo?.contacts.facebook}
              </h4>
            )}
            {isEdit ? (
              <>
                <h2 className="text-slate-600 font-semibold text-lg mt-3">
                  Telegram Link
                </h2>
                <Input
                  placeholder={"https://www.telegram.comxxx"}
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />
              </>
            ) : (
              <h4 className="flex items-center gap-2 text-slate-700 mt-3">
                <FaTelegram className="size-6" /> {homeInfo?.contacts.telegram}
              </h4>
            )}
          </div>
          <div className="mt-5">
            <h3 className="text-lg font-bold text-slate-700">
              Contact Background Image
            </h3>
            <div className="w-full h-52 mt-4 relative">
              <img
                className="w-full h-full object-contain"
                src={previewContactBg}
              />
              {isEdit ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    ref={contactBgInput}
                    className="hidden"
                    onChange={handleContactBgChange}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-30 flex justify-center items-center cursor-pointer"
                    onClick={() => contactBgInput.current.click()}
                  >
                    <FaUpload className="size-10 text-gray-400" />
                  </div>
                </>
              ) : (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-30 flex justify-center items-center cursor-pointer">
                  <FaImage className="size-10 text-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/**Button */}
        <div className="flex mt-3 px-4 justify-between">
          {isEdit && (
            <>
              <button
                className="px-4 py-2 border rounded text-slate-700 hover:bg-gray-100"
                onClick={() => {
                  setIsEdit(false);
                  setPreviewBg(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 rounded text-white"
                onClick={handleSaveButton}
                disabled={isHomeUpdateLoading}
              >
                {isHomeUpdateLoading ? "Please wait!Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default memo(AdminView(AdminHome));
