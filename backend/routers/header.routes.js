import express from "express";
import {
  getHeader,
  postHeader,
  updateHeader,
} from "../controller/header.controller.js";
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getHeader);
router.post("/", protectRoute, adminOnly, postHeader);
router.patch("/:id", protectRoute, adminOnly, updateHeader);

export default router;
