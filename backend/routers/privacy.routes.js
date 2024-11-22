import expres from "express";
import {
  createPolicy,
  getPolicy,
  updatePolicy,
} from "../controller/privacy.controller.js";

const router = expres.Router();

router.get("/", getPolicy);
router.post("/", createPolicy);
router.patch("/:id", updatePolicy);

export default router;
