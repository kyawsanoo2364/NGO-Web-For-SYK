import mongoose from "mongoose";
import Header from "../model/Header.model.js";

export const getHeader = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Header ID" });
    }

    const header = await Header.findById(id);
    res.status(200).json({ content: header });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postHeader = async (req, res) => {
  try {
    const { logoImage, companyName } = req.body;
    const header = new Header({
      logo: logoImage,
      companyName,
    });
    await header.save();
    res.status(201).json({ message: "Header created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateHeader = async (req, res) => {
  try {
    const { logo, companyName } = req.body;
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Header ID" });
    }
    if (!logo || !companyName) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const updatedHeader = await Header.findByIdAndUpdate(
      id,
      { logo, companyName },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Header updated successfully", content: updatedHeader });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
