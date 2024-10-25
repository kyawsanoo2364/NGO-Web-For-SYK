import mongoose from "mongoose";
import { Course } from "../model/Event.model.js";
import EducationProject from "../model/EducationProject.model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, description, from, to, duration } = req.body;
    if (!title || !description || !from || !to || !duration) {
      return res.status(400).json("All fields are required");
    }
    const course = new Course({
      title,
      description,
      duration,
      schedule: { from, to },
    });
    await course.save();
    res
      .status(201)
      .json({ message: "Course created successfully", content: course });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses: courses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Errors" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const course = await Course.findById(id);
    return res.status(200).json({ course: course });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const { title, description, from, to, duration } = req.body;
    await Course.findByIdAndUpdate(id, {
      title,
      description,
      schedule: { from, to },
      duration,
    });
    res.status(201).json({ message: "Course updated successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    await Course.findByIdAndDelete(id);
    res.status(201).json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToEduProject = async (req, res) => {
  try {
    const { eduId, courseId } = req.params;
    if (!eduId || !courseId) {
      return res
        .status(400)
        .json({ message: "Edu Or Course Id is not found! All required." });
    }
    if (
      !mongoose.Types.ObjectId.isValid(eduId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "No Course Found!" });
    }
    const existCoursInProject = await EducationProject.findOne({
      _id: eduId,
      courses: {
        $in: [courseId],
      },
    });
    if (existCoursInProject) {
      return res
        .status(400)
        .json({ message: "Course has been in Edu Project" });
    }
    const edu = await EducationProject.findByIdAndUpdate(
      eduId,
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    res.status(201).json({ message: "Course add to project successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
