import { motion } from "framer-motion";
import { ModleView } from "../hoc";

const SendForgotEmailSuccess = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-slate-400 to-pink-400  flex justify-center items-center px-2 relative">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md p-4 w-full rounded-lg bg-white shadow-md"
      >
        <div className="flex justify-center">
          <img src="/sendemail.gif" alt="" className="size-32 object-cover" />
        </div>
        <p className="my-5 text-center text-lg text-slate-600 font-semibold">
          A password reset link has been sent to your email. Please check your
          inbox
        </p>
      </motion.div>
    </div>
  );
};
export default ModleView(SendForgotEmailSuccess);
