import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoURL: String,
    media: Array,
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogModel);

export default Blog;
