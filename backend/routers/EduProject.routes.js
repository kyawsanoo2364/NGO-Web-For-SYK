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

const router = express.Router();

router.get("/", getAllEduProject);
router.post(
  "/",
  upload.single("imageFile"),
  uploadImage("syk_eduProjects"),
  createEduProject
);
//router.patch("/addCourse/:eduId/:courseId", addToEduProject);
router.get("/details/:id", getDetailsEduProject);
router.delete("/:id", deleteEduProject);
router.patch("/:id", upload.single("logoImage"), updateEduProject);

export default router;
