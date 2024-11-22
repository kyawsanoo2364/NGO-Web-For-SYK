import removeImageFromCloudinary from "../utils/removeImageFromCloudinary.js";

const deleteImage = async (req, res, next) => {
  try {
    if (req.file) {
      await removeImageFromCloudinary(req.body.imageId);
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteImage;
