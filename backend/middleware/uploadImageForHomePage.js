import cloudinary from "../utils/Cloudinary.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

const uploadImageForHomePage = async (req, res, next) => {
  try {
    if (req.file) {
      const { secure_url, public_id } = await uploadImageToCloudinary(
        "syk_heroBg",
        req.file.path,
        { useOneFolderAndOneFile: true }
      );
      if (secure_url) {
        req.heroBackgroundImage = secure_url;

        next();
      }
    } else {
      req.heroBackgroundImage = req.body.heroBackgroundImage;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default uploadImageForHomePage;
