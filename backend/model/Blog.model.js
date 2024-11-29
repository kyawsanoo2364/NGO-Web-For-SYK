import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    title_en: {
      type: String,
      required: true,
    },
    description_en: {
      type: String,
      required: true,
    },
    title_mm: {
      type: String,
      required: true,
    },
    description_mm: {
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
