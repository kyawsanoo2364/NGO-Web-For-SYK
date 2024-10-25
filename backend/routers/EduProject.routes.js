import express from "express";
import {
  createEduProject,
  deleteEduProject,
  getAllEduProject,
  getDetailsEduProject,
  updateEduProject,
} from "../controller/eduProject.controller.js";
import { addToEduProject } from "../controller/course.controller.js";

const router = express.Router();

router.get("/", getAllEduProject);
router.post("/", createEduProject);
router.patch("/addCourse/:eduId/:courseId", addToEduProject);
router.get("/details/:id", getDetailsEduProject);
router.delete("/:id", deleteEduProject);
router.patch("/:id", updateEduProject);

export default router;
