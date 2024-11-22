import express from "express";
import {
  getHeader,
  postHeader,
  updateHeader,
} from "../controller/header.controller.js";

const router = express.Router();

router.get("/:id", getHeader);
router.post("/", postHeader);
router.patch("/:id", updateHeader);

export default router;
