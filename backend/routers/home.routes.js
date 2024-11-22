import express from "express";
import {
  createHomePage,
  getHomePage,
  UpdateHomePage,
} from "../controller/home.controller.js";
import upload from "../middleware/multer.js";

import uploadImageForHomePage from "../middleware/uploadImageForHomePage.js";

const router = express.Router();

router.get("/", getHomePage);
router.post("/", createHomePage);
router.patch(
  "/:id",
  upload.single("bgFile"),
  uploadImageForHomePage,
  UpdateHomePage
);

export default router;
