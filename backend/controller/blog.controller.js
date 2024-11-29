import mongoose from "mongoose";
import Blog from "../model/Blog.model.js";
import { IsCheckTextFromURL } from "../utils/IsCheckText.mjs";
import cloudinary from "../utils/Cloudinary.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

export const getBlog = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await Blog.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ contents: posts, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

export const getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No data found", success: false });
    }
    const blogPost = await Blog.find({ _id: id });
    if (!blogPost) {
      return res.status(404).json({ message: "No data found", success: false });
    }
    res.status(200).json({ content: blogPost, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

export const PostBlog = async (req, res) => {
  try {
    const { title_en, title_mm, description_en, description_mm, videoURL } =
      req.body;

    if (
      !title_en ||
      !title_mm ||
      !description_en ||
      !description_mm ||
      !req.media ||
      req.media.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const post = new Blog({
      title_en,
      title_mm,
      description_en,
      description_mm,
      media: req.media,
      videoURL,
    });

    await post.save();

    res.status(201).json({
      content: post,
      message: "Your post is created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server errors!", success: false });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title_en,
      title_mm,
      description_en,
      description_mm,
      media,
      removeImagesId,
    } = req.body;
    let m = JSON.parse(media);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({});
    }

    //delete unused images
    if (removeImagesId?.length > 0) {
      await cloudinary.api.delete_resources(removeImagesId);
    }

    let images = [];
    if (req.files) {
      for (const file of req.files) {
        const { secure_url, public_id } = await uploadImageToCloudinary(
          "syk_blogs",
          file.path,
          {
            useOneFolderAndOneFile: false,
          }
        );
        images.push({ url: secure_url, id: public_id });
      }
    }
    if (images.length > 0) {
      m = [...JSON.parse(media), ...images];
    }

    if (!title_en || !title_mm || !description_en || !description_mm || !m) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title_en,
        title_mm,
        description_en,
        description_mm,
        media: m,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Blog post updated successfully!",
      success: true,
      content: updateBlog,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404);
    const existBlog = await Blog.findById(id);
    if (existBlog) {
      for (const media of existBlog.media) {
        await cloudinary.uploader.destroy(media.id);
      }
    }
    await Blog.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Blog post is removed successfully!", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};
