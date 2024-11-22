import mongoose from "mongoose";
import PartnershipModel from "../model/Patnership.model.js";
import cloudinary from "../utils/Cloudinary.js";

export const getPartnerships = async (req, res) => {
  try {
    const partnerships = await PartnershipModel.find();
    res.status(200).json({ partnerships: partnerships });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export const createPartnership = async (req, res) => {
  try {
    const { name, webLink } = req.body;
    const imageUrl = req.imageUrl;
    const imageId = req.imageId;
    if (!name || !webLink || !imageUrl || !imageId) {
      return res
        .status(400)
        .json({ message: "400 - All fileds are required!" });
    }
    const newPartner = new PartnershipModel({
      name,
      webLink,
      imageId,
      imageUrl,
    });
    await newPartner.save();

    res.status(201).json({
      message: "Partnership created successfully!",
      partnership: newPartner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};

export const deletePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "404 - Invalid Partnership ID" });
    }

    const partner = await PartnershipModel.findById(id);
    await cloudinary.uploader.destroy(partner.imageId);
    await PartnershipModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Removed Partnership successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "500 - Internal Server Error" });
  }
};
