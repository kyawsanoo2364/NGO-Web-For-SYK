import { useEffect, useRef } from "react";

const ToggleSwitchButton = ({ onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    onChange(inputRef.current.checked);
  }, []);

  return (
    <label
      htmlFor="check"
      className="relative w-14 h-7 bg-gray-100 rounded-full cursor-pointer "
    >
      <input
        type="checkbox"
        id="check"
        className="sr-only peer"
        ref={inputRef}
        onChange={() => onChange(inputRef.current.checked)}
      />
      <span className="w-2/5 h-4/5 absolute bg-rose-400 rounded-full left-1 top-1 peer-checked:bg-rose-500 peer-checked:left-7"></span>
    </label>
  );
};
export default ToggleSwitchButton;
