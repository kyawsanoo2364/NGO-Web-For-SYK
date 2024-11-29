import express from "express";
import {
  createHomePage,
  getHomePage,
  UpdateHomePage,
} from "../controller/home.controller.js";
import upload from "../middleware/multer.js";

import uploadImageForHomePage from "../middleware/uploadImageForHomePage.js";
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getHomePage);
router.post("/", protectRoute, adminOnly, createHomePage);
router.patch(
  "/:id",
  protectRoute,
  adminOnly,
  upload.single("bgFile"),
  uploadImageForHomePage,
  UpdateHomePage
);

export default router;
