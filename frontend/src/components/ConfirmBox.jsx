const ConfirmBox = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black p-2 bg-opacity-20 z-20 flex justify-center items-center">
      <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow">
        <h1 className="text-xl font-bold text-slate-800 ">Confirm</h1>
        <div className="w-full h-[1px] bg-gray-400 my-3" />
        <div>
          <p className="text-lg font-semibold text-slate-800">{text}</p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button
            className="border px-4 py-2 hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmBox;
