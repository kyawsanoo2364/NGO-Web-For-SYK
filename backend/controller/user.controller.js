import mongoose from "mongoose";
import User from "../model/User.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    res.json({ user: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserForOnlyAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, birth, phone, role, location } = req.body;

    if (!fullName || !email || !birth || !phone || !role || !location) {
      return res
        .status(400)
        .json({ message: "400 - All fields are required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "400 - Invalid user id!" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { fullName, email, role, birth, phone, location },
      { new: true }
    );
    return res.status(200).json({ message: "User information updated!", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, birth, phone } = req.body;
    if (!fullName || !email || !birth || !phone) {
      return res
        .status(400)
        .json({ message: "400 - All fields are required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "400 - Invalid user id!" });
    }
    await User.findByIdAndUpdate(
      id,
      { fullName, email, birth, phone },
      { new: true }
    );
    return res.status(200).json({ message: "User information updated!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User has removed successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
