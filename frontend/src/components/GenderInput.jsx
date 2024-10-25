const GenderInput = ({ checkedValue, changeValue }) => {
  return (
    <div className="my-5 flex gap-3">
      <div className="flex items-center gap-3">
        <label htmlFor="male">Male</label>
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
        <label htmlFor="female">Female</label>
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
        <label htmlFor="other">Other</label>
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
