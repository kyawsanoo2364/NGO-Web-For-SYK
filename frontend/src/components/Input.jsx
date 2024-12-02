import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const Input = ({
  label,
  placeholder,
  inputType,
  required,
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-1 space-y-2 mb-4 relative">
      <label className="text-gray-700 text-lg">{label}</label>
      <input
        type={
          inputType === "password"
            ? showPassword
              ? "text"
              : "password"
            : inputType
        }
        placeholder={placeholder}
        required={required}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="px-4 pr-10 w-full py-2 md:py-3 border text-[16px] md:text-lg outline-none focus:ring-2 focus:ring-green-400 rounded focus:ring-offset-2 focus:ring-offset-gray-300"
      />
      {inputType === "password" && (
        <div
          className={`absolute right-0 pr-2 flex justify-center items-center h-full cursor-pointer ${
            label ? "top-3" : ""
          }`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <IoEye className="text-gray-700 size-5 md:size-6" />
          ) : (
            <IoEyeOff className="text-gray-700 size-5 md:size-6" />
          )}
        </div>
      )}
    </div>
  );
};
export default Input;
