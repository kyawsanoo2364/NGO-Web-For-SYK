import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

const uploadImage = (foldername) => async (req, res, next) => {
  try {
    if (req.file) {
      const { secure_url, public_id } = await uploadImageToCloudinary(
        foldername,
        req.file.path,
        { useOneFolderAndOneFile: false }
      );
      if (secure_url && public_id) {
        req.imageUrl = secure_url;
        req.imageId = public_id;
        next();
      }
    } else {
      req.imageUrl = req.body.imageUrl;
      req.imageId = req.body.imageId;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default uploadImage;
