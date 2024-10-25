import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    header: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: Array,
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogModel);

export default Blog;
