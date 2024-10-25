const SectionWrapper = (Component, idName) =>
  function Hoc() {
    return (
      <div>
        <span className="hash-span" id={idName}></span>
        <Component />
      </div>
    );
  };
export default SectionWrapper;
