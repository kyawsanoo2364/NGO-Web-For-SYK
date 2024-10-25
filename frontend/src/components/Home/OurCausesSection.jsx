import FundriseCard from "../Cards/FundriseCard";

const OurCausesSection = () => {
  return (
    <div className="my-10">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-center text-slate-700 text-2xl font-bold ">
            Latest Causes
          </h1>
          <div className="h-[1px] bg-orange-600 w-[100px] mt-4 " />
        </div>
        <div className="flex justify-center flex-wrap md:flex-row flex-col  items-center my-10 gap-5">
          {[...new Array(3)].map((_, idx) => (
            <FundriseCard
              key={"fundrise+" + idx}
              idx={idx}
              title={"Food for children"}
              description={`  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, minima!
          Unde reiciendis nostrum perferendis corporis numquam totam porro
          veritatis repellendus explicabo enim recusandae magni, aperiam
          distinctio sint voluptatibus optio natus.`}
              raised={1500}
              goal={2000}
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6supziUoOzp5KKBfBlcapy159EbpGcwG_Sw&s"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default OurCausesSection;
