import { useEffect, useState } from "react";
import Input from "../Input";
import { ContactUs, detectedLanguage } from "../../utils";
import { useLanguage } from "../../store/LanguageStore";
import { useHomeStore } from "../../store/HomeStore";

const ContactUsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { homeInfo } = useHomeStore();
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    message: "",
  });
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await ContactUs.sendEmail({
      from_name: formData.user_name,
      from_email: formData.user_email,
      message: formData.message,
      to_name: "Show Your Kindness",
    });
    setFormData({ user_email: "", user_name: "", message: "" });
    setIsLoading(false);
  };
  return (
    <div className="mt-10 bg-gradient-to-r from-emerald-500 via-green-200 to-green-800 p-5 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-5 justify-between items-center">
          <div className="max-w-md w-full bg-white p-4 mt-5 rounded-lg">
            <h1 className="text-slate-700 font-bold text-2xl">
              {translate.contact}
            </h1>
            <form className="mt-2" onSubmit={handleSubmit}>
              <p className="my-3 text-slate-500 text-balance text-sm">
                {translate.contactDescription}
              </p>
              <Input
                placeholder={translate.name}
                name={"user_name"}
                value={formData.user_name}
                onChange={handleChange}
                inputType={"text"}
                required={true}
              />
              <Input
                placeholder={translate.email}
                name={"user_email"}
                inputType={"email"}
                value={formData.user_email}
                onChange={handleChange}
                required={true}
              />
              <textarea
                rows={10}
                className="w-full outline-none border border-slate-300 p-4 "
                placeholder={translate.description}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required={true}
              ></textarea>
              <button
                type="submit"
                className={`px-4 py-3 w-full mt-2 mx-auto text-white rounded-full text-lg ${
                  isLoading
                    ? "bg-blue-300 text-white"
                    : "hover:bg-blue-600  bg-blue-400 "
                } `}
                disabled={isLoading}
              >
                {isLoading ? translate.sendingMessage : translate.sendMessage}
              </button>
            </form>
          </div>
          <div className="w-full h-[300px] md:h-[600px] relative">
            <img
              src={homeInfo?.contactBg}
              alt=""
              className="w-full h-full object-cover  md:rounded-full backdrop-filter backdrop-blur-sm opacity-70 border border-green-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUsSection;
