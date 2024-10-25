import { motion } from "framer-motion";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import GenderInput from "../components/GenderInput";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "react-toastify";

const Signup = () => {
  const { isLoading, signup } = useAuthStore();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState("male");
  const navigate = useNavigate();

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
              placeholder={"Enter Your Full Name"}
              label={"FullName"}
              inputType={"text"}
              name={"fullName"}
              value={formInput.fullName}
              onChange={handleChangeInput}
              required={true}
            />
            <Input
              placeholder={"Enter Your Email Address"}
              label={"Email"}
              inputType={"email"}
              name="email"
              required={true}
              value={formInput.email}
              onChange={handleChangeInput}
            />
            <Input
              placeholder={""}
              label={"Birthday"}
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
              placeholder={"Street,City,Region,Country"}
              label={"Address"}
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
              label={"Password"}
              inputType={"password"}
              name="password"
              required={true}
              value={formInput.password}
              onChange={handleChangeInput}
            />
            <Input
              placeholder={"******"}
              label={"Confirm Password"}
              inputType={"password"}
              name={"confirmPassword"}
              value={formInput.confirmPassword}
              onChange={handleChangeInput}
              required={true}
            />
            <p className="my-5">
              Already have an account? Please{" "}
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Sign in
              </Link>
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
                  <LoadingSpinner size={"size-6"} /> Registering. Please wait...
                </div>
              ) : (
                "Register"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};
export default Signup;
