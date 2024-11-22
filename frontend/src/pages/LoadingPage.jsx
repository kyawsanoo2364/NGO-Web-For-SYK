const LoadingPage = () => {
  return (
    <div className="w-full h-full flex  justify-center items-center min-h-screen">
      <div className="flex items-center flex-col justify-center gap-4">
        <div className="flex items-center gap-0">
          <h3 className="font-bold text-xl text-slate-700 animate-bounce">
            Loading! Please wait
          </h3>
          <img
            src="/loading-ball.gif"
            className="select-none size-[200px] object-contain -ml-10"
          />
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;
