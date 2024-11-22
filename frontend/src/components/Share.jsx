import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { handleCopyLink, SocialMedia } from "../utils";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { motion } from "framer-motion";

const Share = ({ currentUrl, shareTitle }) => {
  const socialMedia = new SocialMedia(currentUrl, shareTitle);
  return (
    <div className="mt-4 flex items-center justify-between">
      <h4 className="text-slate-500 text-xl font-bold flex items-center gap-2">
        <IoMdShare /> Share
      </h4>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.2 }}
          className=""
          onClick={() => handleCopyLink(currentUrl)}
        >
          <MdOutlineContentCopy className="size-6  text-slate-600 hover:text-orange-500" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.2 }}
          className=""
          onClick={() => socialMedia.handleFacebookShare()}
        >
          <FaFacebook className="size-6  text-slate-600 hover:text-blue-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.2 }}
          onClick={() => socialMedia.handleTwitterShare()}
        >
          <FaTwitter className="size-6  text-slate-600 hover:text-blue-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.2 }}
          onClick={() => socialMedia.handleLinkedInShare()}
        >
          <FaLinkedin className="size-6  text-slate-600 hover:text-blue-700" />
        </motion.button>
      </div>
    </div>
  );
};
export default Share;
