import mongoose from "mongoose";
import StaffModel from "../model/Staff.model.js";
import cloudinary from "../utils/Cloudinary.js";

const getStaff = async (req, res) => {
  try {
    const staffs = await StaffModel.find();
    return res.status(200).json({ contents: staffs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

const createStaff = async (req, res) => {
  try {
    const { name, email, telegramLink, facebookLink, position } = req.body;
    const imageUrl = req.imageUrl;
    const imageId = req.imageId;
    if (
      !name ||
      !email ||
      !telegramLink ||
      !facebookLink ||
      !imageUrl ||
      !imageId ||
      !position
    ) {
      return res
        .status(400)
        .json({ message: "400 - All fields are required!" });
    }

    const newStaff = new StaffModel({
      name,
      email,
      facebookLink,
      telegramLink,
      imageUrl,
      imageId,
      position,
    });
    await newStaff.save();

    return res
      .status(201)
      .json({ content: newStaff, message: "New Member created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "404 - Invalid Member Id" });
    }
    const staff = await StaffModel.findById(id);
    await cloudinary.uploader.destroy(staff.imageId);
    await StaffModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Member deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export { createStaff, getStaff, deleteStaff };
