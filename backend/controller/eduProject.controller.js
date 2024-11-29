import mongoose from "mongoose";
import EducationProject from "../model/EducationProject.model.js";
import { Course } from "../model/Event.model.js";
import cloudinary from "../utils/Cloudinary.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";

export const getAllEduProject = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const projects = await EducationProject.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({ contents: projects });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const createEduProject = async (req, res) => {
  try {
    const {
      title_en,
      title_mm,
      description_en,
      description_mm,
      location_en,
      location_mm,
      date,
    } = req.body;
    const logoImage = req.imageUrl;
    const imageId = req.imageId;
    if (
      !title_en ||
      !title_mm ||
      !description_en ||
      !description_mm ||
      !logoImage ||
      !location_en ||
      !location_mm ||
      !date ||
      !logoImage
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const project = new EducationProject({
      title_en,
      title_mm,
      description_en,
      description_mm,
      date,
      logoImage,
      imageId,
      location_en,
      location_mm,
    });
    await project.save();
    res.status(201).json({
      message: "Education Project has created successfully!",
      project: project,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDetailsEduProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const project = await EducationProject.findById(id);
    res.status(200).json({ content: project });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEduProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    const existEduProject = await EducationProject.findById(id);
    if (existEduProject) {
      await cloudinary.uploader.destroy(existEduProject.imageId);
    }
    await EducationProject.findByIdAndDelete(id);

    res.status(201).json({ message: "Project removed successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEduProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title_en,
      title_mm,
      description_en,
      description_mm,
      location_en,
      location_mm,
      date,
    } = req.body;
    if (
      !title_en ||
      !title_mm ||
      !description_en ||
      !description_mm ||
      !location_en ||
      !location_mm ||
      !date
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "400 - Invalid Id" });
    }

    if (req.file) {
      const existProject = await EducationProject.findById(id);
      if (existProject.logoImage) {
        await cloudinary.uploader.destroy(existProject.imageId);
      }
      const { secure_url, public_id } = await uploadImageToCloudinary(
        "syk_eduProjects",
        req.file.path,
        { useOneFolderAndOneFile: false }
      );
      if (secure_url && public_id) {
        const project = await EducationProject.findByIdAndUpdate(
          id,
          {
            title_en,
            title_mm,
            description_en,
            description_mm,
            location_en,
            location_mm,
            date,
            logoImage: secure_url,
            imageId: public_id,
          },
          { new: true }
        );

        res
          .status(200)
          .json({ message: "Post Updated successfully!", project: project });
      }
    } else {
      const project = await EducationProject.findByIdAndUpdate(
        id,
        {
          title_en,
          title_mm,
          description_en,
          description_mm,
          location_en,
          location_mm,
          date,
        },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Post Updated successfully!", project: project });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
