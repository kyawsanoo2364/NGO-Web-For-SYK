import express from "express";
import {
  deleteBlog,
  getBlog,
  getBlogDetails,
  PostBlog,
  updateBlog,
} from "../controller/blog.controller.js";
import uploadMultipleImage from "../middleware/uploadMultipleImage.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.get("/", getBlog);
router.post(
  "/",
  upload.array("imageFiles", 10),
  uploadMultipleImage("syk_blogs"),
  PostBlog
);
router.get("/details/:id", getBlogDetails);
router.patch("/:id", upload.array("imageFiles", 10), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
