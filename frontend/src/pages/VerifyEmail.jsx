import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthStore } from "../store/AuthStore";
import { Navigate, useNavigate } from "react-router-dom";
import { ModleView } from "../hoc";

const VerifyEmail = () => {
  const { isLoading, verifyEmail, user } = useAuthStore();
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    let newCode = [...code];
    if (value.length > 1) {
      if (newCode.findLastIndex((d) => d !== "")) {
        newCode = [...new Array(6).fill("")];
        setCode(newCode);
        for (let i = 0; i < newCode.length; i++) {
          inputRefs[i].value = "";
        }
        inputRefs[0].focus();
        return;
      }
      const pastedValue = value.slice(0.6).split("");

      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedValue[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((d) => d !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) inputRefs[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const verifyCode = code.join("");
      const res = await verifyEmail({ userId: user._id, code: verifyCode });
      if (res) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-500 via-slate-400 to-pink-400  flex justify-center items-center px-2 relative">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-lg p-4 shadow-md "
        >
          <h1 className="text-center font-bold text-2xl text-slate-700">
            Verify Your Email
          </h1>
          <div className="flex items-center justify-center my-2">
            <img src="/verify.png" className="object-cover size-20" />
          </div>

          <p className="my-2 text-sm text-slate-700">
            We sent verification code to your email. Please check your gmail.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-3 flex grid-cols-6 gap-2">
              {[...Array(6)].map((_, index) => (
                <input
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onChange={(e) => handleChange(e, index)}
                  ref={(el) => (inputRefs[index] = el)}
                  type="text"
                  className="w-full h-10 md:h-14 border border-slate-400 outline-none px-4 py-2 text-2xl font-bold focus:ring-2 focus:ring-green-300 text-center "
                  required
                  key={`verify-${index}`}
                  disabled={isLoading}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 mt-3 rounded-lg w-full text-white font-semibold bg-blue-400"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <LoadingSpinner size={"size-6"} /> Verifying
                </div>
              ) : (
                "Verify"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};
export default ModleView(VerifyEmail);
