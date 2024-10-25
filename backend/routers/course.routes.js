import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "../controller/course.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { enrollCourse } from "../controller/student.controller.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/details/:id", getCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/enroll/:courseId", protectRoute, enrollCourse);

export default router;
