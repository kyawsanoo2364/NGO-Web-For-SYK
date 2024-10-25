import mongoose from "mongoose";
import EducationProject from "../model/EducationProject.model.js";
import { Course } from "../model/Event.model.js";

export const getAllEduProject = async (req, res) => {
  try {
    const projects = await EducationProject.find({}).populate("courses");
    return res.status(200).json({ contents: projects });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const createEduProject = async (req, res) => {
  try {
    const { title, description, logoImage, location, date, duration } =
      req.body;
    if (
      !title ||
      !description ||
      !logoImage ||
      !location ||
      !date ||
      !duration
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const project = new EducationProject({
      title,
      description,
      date,

      duration,
      logoImage,
      location,
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
    const project = await EducationProject.findById(id).populate("courses");
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
    const project = await EducationProject.findById(id);
    console.log(project.courses.length);

    if (project.courses && project.courses.length > 0) {
      for (let i = 0; i < project.courses.length; i++) {
        await Course.findByIdAndDelete(project.courses[i]);
      }
    }

    await project.deleteOne();
    res.status(201).json({ message: "Project removed successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEduProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, logoImage, location, date, duration } =
      req.body;
    if (
      !title ||
      !description ||
      !logoImage ||
      !location ||
      !date ||
      !duration
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "400 - Invalid Id" });
    }
    await EducationProject.findByIdAndUpdate(
      id,
      {
        title,
        description,
        logoImage,
        location,
        date,
        duration,
      },
      { new: true }
    );

    res.status(200).json({ message: "Post Updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
