import express from "express";
import {
  createPartnership,
  deletePartnership,
  getPartnerships,
} from "../controller/partnership.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getPartnerships);
router.post(
  "/",
  protectRoute,
  adminOnly,
  upload.single("imageFile"),
  uploadImage("syk_partnerships"),
  createPartnership
);
router.delete("/:id", protectRoute, adminOnly, deletePartnership);

export default router;
