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
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post(
  "/",
  protectRoute,
  adminOnly,
  upload.single("imageFile"),
  uploadImage("syk_events"),
  createEvents
);
router.patch(
  "/:id",
  protectRoute,
  adminOnly,
  upload.single("imageFile"),
  deleteImage,
  uploadImage("syk_events"),
  updateEvent
);
router.delete("/:id", protectRoute, adminOnly, deleteEvent);

export default router;
