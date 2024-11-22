import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const VisionMissionCard = ({
  title,
  icon,
  description,
  delay,
  reverse = false,
  once = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set threshold for mobile width (768px)
    };

    // Initial check
    handleResize();

    // Add event listener to handle screen resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: once }}
      transition={{ duration: 1, delay }}
      variants={{
        visible: { opacity: 1 },

        hidden: { opacity: 0 },
      }}
      className={`w-full flex-col md:p-4  flex justify-center items-center ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="w-fit md:w-[600px]  rounded-md flex justify-center items-center">
        <motion.img
          initial="hidden"
          whileInView="visible"
          viewport={{ once: once }}
          transition={{ duration: 1, delay }}
          variants={() => {
            if (isMobile) {
              return {
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 0 },
              };
            }
            return {
              visible: { opacity: 1, x: 100 },

              hidden: { opacity: 0, x: -100 },
            };
          }}
          src={icon}
          alt=""
          className="object-contain size-[150px]"
        />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: once }}
        transition={{ duration: 1, delay }}
        variants={() => {
          if (isMobile) {
            return {
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: 0 },
            };
          }
          return {
            visible: { opacity: 1, x: 0 },

            hidden: { opacity: 0, x: 100 },
          };
        }}
        className="p-4 w-full"
      >
        <h2 className="text-center text-xl md:text-2xl font-semibold text-slate-800">
          {title}
        </h2>
        <p className="mt-5 text-balance text-center text-slate-800">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};
export default VisionMissionCard;
