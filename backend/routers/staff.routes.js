import express from "express";
import {
  createStaff,
  deleteStaff,
  getStaff,
} from "../controller/staff.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getStaff);
router.post(
  "/",
  protectRoute,
  adminOnly,
  upload.single("imageFile"),
  uploadImage("syk_staffs"),
  createStaff
);
router.delete("/:id", protectRoute, adminOnly, deleteStaff);

export default router;
