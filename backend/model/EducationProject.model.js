import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logoImage: { type: String, default: "" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    location: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true, default: null },
  },
  { timestamps: true }
);

const EducationProject = mongoose.model("educationProject", projectSchema);

export default EducationProject;
