import express from "express";
import {
  createEvents,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controller/event.controller.js";
const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvents);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
