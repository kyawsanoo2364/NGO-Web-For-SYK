import express from "express";
import {
  createEduProject,
  deleteEduProject,
  getAllEduProject,
  getDetailsEduProject,
  updateEduProject,
} from "../controller/eduProject.controller.js";
import { addToEduProject } from "../controller/course.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";
import protectRoute from "../middleware/protectRoute.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", getAllEduProject);
router.post(
  "/",
  protectRoute,
  adminOnly,
  upload.single("imageFile"),
  uploadImage("syk_eduProjects"),
  createEduProject
);
//router.patch("/addCourse/:eduId/:courseId", addToEduProject);
router.get("/details/:id", getDetailsEduProject);
router.delete("/:id", protectRoute, adminOnly, deleteEduProject);
router.patch(
  "/:id",
  protectRoute,
  adminOnly,
  upload.single("logoImage"),
  updateEduProject
);

export default router;
