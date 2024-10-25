import express from "express";
import {
  deleteBlog,
  getBlog,
  getBlogDetails,
  PostBlog,
  updateBlog,
} from "../controller/blog.controller.js";
const router = express.Router();

router.get("/", getBlog);
router.post("/", PostBlog);
router.get("/details/:id", getBlogDetails);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
