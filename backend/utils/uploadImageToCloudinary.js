import cloudinary from "./Cloudinary.js";

const uploadImageToCloudinary = async (
  folderName,
  filePath,
  { useOneFolderAndOneFile = false }
) => {
  if (useOneFolderAndOneFile) {
    const oldResult = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName,
    });
    oldResult.resources?.forEach(async (resource) => {
      //delete existing image files
      await cloudinary.uploader.destroy(resource.public_id);
    });
  }
  //upload new image file in folder
  const result = await cloudinary.uploader.upload(filePath, {
    folder: folderName,
    overwrite: true,
    use_filename: true,
    unique_filename: false,
  });

  const secure_url = result.secure_url;
  const public_id = result.public_id;
  return { secure_url, public_id };
};

export default uploadImageToCloudinary;
