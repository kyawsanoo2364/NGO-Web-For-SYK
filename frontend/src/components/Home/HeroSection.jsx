import { motion } from "framer-motion";
import Card from "../Cards/Card";
import { SectionWrapper } from "../../hoc";

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen relative ">
      <img
        src={"https://serudsindia.org/wp-content/uploads/2019/11/99A0665-1.jpg"}
        className="object-cover w-full min-h-screen"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 bg-opacity-50 flex items-center justify-center text-center">
        <div className="max-w-4xl p-4 mt-24">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-white"
          >
            Empowering Communities, Changing Lives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[15px] mg:text-lg lg:text-xl font-semibold mt-5 text-white"
          >
            Join us in our mission to provide education, healthcare, and
            opportunities to underprivileged communities across the world.
            Together, we can create a brighter future for everyone.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className=" my-5 px-4 py-2 rounded-md bg-orange-500 text-white text-[16px] md:text-lg "
          >
            Donate Now
          </motion.button>
        </div>
      </div>
      {/* <div className="absolute -bottom-48 left-0 right-0">
        <div className="flex justify-center items-center ">
          <Card
            title={"Make Donation"}
            description={`Your generosity can change lives! Help us provide shelter and support
          to those in need. Donate today and make a lasting impact`}
            buttonName={"Donate"}
            icon={"/donation.png"}
          />
        </div>
      </div> */}
    </div>
  );
};
export default HeroSection;