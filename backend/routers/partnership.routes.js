import express from "express";
import {
  createPartnership,
  deletePartnership,
  getPartnerships,
} from "../controller/partnership.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/", getPartnerships);
router.post(
  "/",
  upload.single("imageFile"),
  uploadImage("syk_partnerships"),
  createPartnership
);
router.delete("/:id", deletePartnership);

export default router;
