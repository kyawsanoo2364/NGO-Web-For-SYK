import cloudinary from "./Cloudinary.js";

async function removeImageFromCloudinary(imageId) {
  try {
    const res = await cloudinary.api.delete_resources([imageId], {
      type: "upload",
      resource_type: "image",
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

export default removeImageFromCloudinary;
