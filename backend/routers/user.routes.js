import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserForOnlyAdmin,
} from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/user", getUser);

//admin ကနေမှ user တွေကို edit လို့ရမယ့် function
router.patch("/onlyAdmin/:id", updateUserForOnlyAdmin);

//user ကနေမှ ကိုယ့် profile ကို edit လို့ရမယ့် function
router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
