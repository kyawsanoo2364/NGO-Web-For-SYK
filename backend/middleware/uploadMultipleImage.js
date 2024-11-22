import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

const uploadMultipleImage = (folderName) => async (req, res, next) => {
  try {
    if (req.files) {
      let images = [];
      for (const file of req.files) {
        const { secure_url, public_id } = await uploadImageToCloudinary(
          folderName,
          file.path,
          {
            useOneFolderAndOneFile: false,
          }
        );
        images.push({ url: secure_url, id: public_id });
      }
      req.media = images;
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default uploadMultipleImage;
