import express from "express";
import {
  createHomePage,
  getHomePage,
  UpdateHomePage,
} from "../controller/home.controller.js";

const router = express.Router();

router.get("/", getHomePage);
router.post("/", createHomePage);
router.patch("/:id", UpdateHomePage);

export default router;
