import { motion } from "framer-motion";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res) {
        navigate("/");
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
        className="max-w-md w-full p-4 bg-white shadow-xl rounded-xl pb-10 border border-b-pink-400 border-r-pink-300 border-l-green-200"
      >
        <h1 className="text-center text-xl md:text-3xl font-bold mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            inputType={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            inputType={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            className="mt-2 hover:text-blue-400 hover:underline text-sm md:text-[16px]"
            to={"/forgotPassword"}
          >
            Forgot Password?
          </Link>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 px-4 md:py-3 py-2 mx-auto w-full bg-gradient-to-br from-green-400 to-pink-400 rounded-full text-white font-bold text-lg shadow-lg "
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex gap-4 mx-auto text-center justify-center items-center">
                <LoadingSpinner size={"size-6"} /> <span>Please wait...</span>
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
          <p className="mt-6 text-center text-sm md:text-[16px]">
            Don't have account?{" "}
            <Link
              to={"/signup"}
              className="hover:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
export default Login;
