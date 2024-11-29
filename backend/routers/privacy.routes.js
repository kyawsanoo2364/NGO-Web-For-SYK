import expres from "express";
import {
  createPolicy,
  getPolicy,
  updatePolicy,
} from "../controller/privacy.controller.js";
import adminOnly from "../middleware/adminOnly.js";
import protectRoute from "../middleware/protectRoute.js";

const router = expres.Router();

router.get("/", getPolicy);
router.post("/", protectRoute, adminOnly, createPolicy);
router.patch("/:id", protectRoute, adminOnly, updatePolicy);

export default router;
