import { motion } from "framer-motion";
import Input from "../components/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    try {
      const res = await resetPassword(token, newPassword);
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-slate-400 to-pink-400  flex justify-center items-center px-2 relative">
      <motion.div
        className="max-w-md w-full p-8 bg-white rounded-md shadow-md backdrop-filter backdrop-blur-md "
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <Input
            placeholder={"New Password"}
            inputType={"password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder={"Confirm Password"}
            inputType={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 px-4 md:py-3 py-2 mx-auto w-full bg-gradient-to-br from-green-400 to-pink-400 rounded-full text-white font-bold text-lg shadow-lg "
          >
            Set New Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default ResetPassword;
