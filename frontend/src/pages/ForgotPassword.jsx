import { motion } from "framer-motion";
import Input from "../components/Input";
import { MdArrowForward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { ModleView } from "../hoc";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { isLoading, forgotPassword } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(email);
      if (res) {
        navigate("/successForgotPassword");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-slate-400 to-pink-400  flex justify-center items-center px-2 relative">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md p-4 w-full rounded-lg bg-white"
      >
        <h1 className="text-center font-bold text-xl md:text-3xl ">
          Forgot Password
        </h1>
        <p className="my-2 text-center text-[16px] md:text-lg">
          Enter your email address
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            inputType={"email"}
            placeholder={"Email"}
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link
            className="my-6 text-slate-700 ml-3 flex items-center gap-1"
            to={"/login"}
          >
            <IoArrowBackOutline className="size-5 " />
            <span>Back</span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 px-4 md:py-3 py-2 mx-auto w-full bg-gradient-to-br from-green-400 to-pink-400 rounded-full text-white font-bold text-lg shadow-lg "
            type="submit"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-4">
                <LoadingSpinner size={"size-5"} />
                <span>Please wait...</span>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                <span>Continue</span>

                <MdArrowForward className="size-5" />
              </div>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default ModleView(ForgotPassword);
