import React, { useEffect, useState } from "react";
import { useLanguage } from "../store/LanguageStore";

const LanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);
  const { changeLanguage } = useLanguage();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("language")) === "Myanmar") {
      setSelectedLanguage("Myanmar");
    } else {
      setSelectedLanguage("English");
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Add additional logic here (e.g., updating locale)
    changeLanguage(language);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-white hover:text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selectedLanguage}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleLanguageChange("English")}
            >
              English
            </button>
            <button
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleLanguageChange("Myanmar")}
            >
              Myanmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
