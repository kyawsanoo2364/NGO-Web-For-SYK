import { motion } from "framer-motion";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import GenderInput from "../components/GenderInput";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "react-toastify";
import { ModleView } from "../hoc";
import { detectedLanguage } from "../utils";
import { useLanguage } from "../store/LanguageStore";
import { memo } from "react";

const Signup = () => {
  const { isLoading, signup } = useAuthStore();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("male");
  const navigate = useNavigate();
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);

  const [formInput, setFormInput] = useState({
    email: "",
    fullName: "",
    birth: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ ...formInput, phone, gender });
      if (res) {
        navigate("/verify");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-slate-400 to-pink-400  flex justify-center items-center px-2 relative">
        <motion.div
          className="max-w-lg w-full shadow-xl bg-white p-3 px-4 rounded-lg mt-24 mb-10"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-bold text-center text-xl">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder={translate.enterYourFullName}
              label={translate.fullName}
              inputType={"text"}
              name={"fullName"}
              value={formInput.fullName}
              onChange={handleChangeInput}
              required={true}
            />
            <Input
              placeholder={translate.enterEmail}
              label={translate.email}
              inputType={"email"}
              name="email"
              required={true}
              value={formInput.email}
              onChange={handleChangeInput}
            />
            <Input
              placeholder={""}
              label={translate.birthday}
              inputType={"date"}
              name="birth"
              required={true}
              value={formInput.birth}
              onChange={handleChangeInput}
            />
            <PhoneInput
              className="px-4 w-full py-3 border text-lg outline-none focus:ring-2 focus:ring-green-400 rounded focus:ring-offset-2 focus:ring-offset-gray-300"
              placeholder={"+95975000000"}
              label={"Phone Number"}
              name="phone"
              required={true}
              value={phone}
              onChange={setPhone}
            />
            <Input
              placeholder={translate.streetCityRegionCountry}
              label={translate.address}
              inputType={"text"}
              name="location"
              required={true}
              value={formInput.location}
              onChange={handleChangeInput}
            />
            <GenderInput
              checkedValue={gender}
              changeValue={(value) => setGender(value)}
            />
            <Input
              placeholder={"******"}
              label={translate.password}
              inputType={"password"}
              name="password"
              required={true}
              value={formInput.password}
              onChange={handleChangeInput}
            />
            <Input
              placeholder={"******"}
              label={translate.confirmPassword}
              inputType={"password"}
              name={"confirmPassword"}
              value={formInput.confirmPassword}
              onChange={handleChangeInput}
              required={true}
            />
            <p className="my-5">
              {translate.alreadyHaveAnAccountPlease}{" "}
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Sign in
              </Link>{" "}
              {language === "Myanmar" && "လုပ်ပါ။"}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-2 py-4 shadow-md bg-green-500 text-lg text-white rounded-lg hover:bg-green-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <LoadingSpinner size={"size-6"} /> {translate.registering}
                  {translate.pleaseWait}
                </div>
              ) : (
                translate.register
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};
export default memo(ModleView(Signup));
