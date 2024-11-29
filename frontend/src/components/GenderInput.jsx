import { useEffect, useState } from "react";
import { detectedLanguage } from "../utils";
import { useLanguage } from "../store/LanguageStore";

const GenderInput = ({ checkedValue, changeValue }) => {
  const [translate, setTranslate] = useState(detectedLanguage());
  const { language } = useLanguage();

  useEffect(() => {
    setTranslate(detectedLanguage());
  }, [language]);
  return (
    <div className="my-5 flex gap-3">
      <div className="flex items-center gap-3">
        <label htmlFor="male">{translate.male}</label>
        <input
          className="rounded-full size-4"
          type="checkbox"
          name="male"
          id="male"
          value="male"
          checked={checkedValue === "male"}
          onChange={(e) => changeValue(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="female">{translate.female}</label>
        <input
          className="rounded-full size-4"
          type="checkbox"
          name="female"
          id="female"
          value="female"
          checked={checkedValue === "female"}
          onChange={(e) => changeValue(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="other">{translate.other}</label>
        <input
          className="rounded-full size-4"
          type="checkbox"
          name="other"
          id="other"
          value="other"
          checked={checkedValue === "other"}
          onChange={(e) => changeValue(e.target.value)}
        />
      </div>
    </div>
  );
};
export default GenderInput;
