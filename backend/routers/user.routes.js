import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserForOnlyAdmin,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.get("/", protectRoute, adminOnly, getAllUsers);
router.get("/user", getUser);

//admin ကနေမှ user တွေကို edit လို့ရမယ့် function
router.patch("/onlyAdmin/:id", protectRoute, adminOnly, updateUserForOnlyAdmin);

//user ကနေမှ ကိုယ့် profile ကို edit လို့ရမယ့် function
router.patch("/:id", updateUser);

router.delete("/:id", protectRoute, adminOnly, deleteUser);

export default router;
