import express from "express";
import {
  createStaff,
  deleteStaff,
  getStaff,
} from "../controller/staff.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/", getStaff);
router.post(
  "/",
  upload.single("imageFile"),
  uploadImage("syk_staffs"),
  createStaff
);
router.delete("/:id", deleteStaff);

export default router;
