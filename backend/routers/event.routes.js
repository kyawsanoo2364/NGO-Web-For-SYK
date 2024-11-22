import express from "express";
import {
  createEvents,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controller/event.controller.js";
import upload from "../middleware/multer.js";
import uploadImage from "../middleware/uploadImage.js";
import deleteImage from "../middleware/deleteImage.js";
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post(
  "/",
  upload.single("imageFile"),
  uploadImage("syk_events"),
  createEvents
);
router.patch(
  "/:id",
  upload.single("imageFile"),
  deleteImage,
  uploadImage("syk_events"),
  updateEvent
);
router.delete("/:id", deleteEvent);

export default router;
