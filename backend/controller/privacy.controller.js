import mongoose from "mongoose";
import PrivacyPolicyModel from "../model/PrivacyPolicy.model.js";

export const getPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicyModel.find();
    res.status(200).json({ content: policy[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messagte: "500 - Internal Server Error" });
  }
};

export const createPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "400 - Content required!" });
    }
    const newPolicy = new PrivacyPolicyModel({
      content: content,
    });
    await newPolicy.save();
    res.status(201).json({ content: newPolicy });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "404 - Invalid Privacy Id!" });
    }
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "400 - Content required!" });
    }
    const updatedPolicy = await PrivacyPolicyModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    return res.status(200).json({ content: updatedPolicy });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};
