import mongoose from "mongoose";
import Blog from "../model/Blog.model.js";
import { IsCheckTextFromURL } from "../utils/IsCheckText.mjs";

export const getBlog = async (req, res) => {
  try {
    const posts = await Blog.find({});
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
    const { header, description, media } = req.body;
    if (!header || !description || !media || media.length === 0) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    for (let i = 0; i < media.length; i++) {
      const checkText = await IsCheckTextFromURL(media[i]);
      let causeErrorFromForeach = false;

      if (checkText) {
        causeErrorFromForeach = true;
        if (causeErrorFromForeach) {
          return res.status(400).json({
            message: "This url should be (Photo or video) file type.",
            success: false,
          });
        }
        return;
      }
    }

    const post = new Blog({
      header,
      description,
      media,
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({});
    }
    const { header, description, media } = req.body;
    if (!header || !description || !media) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const updateBlog = await Blog.findByIdAndUpdate(id, {
      header,
      description,
      media,
    });
    res.status(201).json({
      message: "Blog post updated successfully!",
      success: true,
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
    await Blog.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Blog post is removed successfully!", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};
