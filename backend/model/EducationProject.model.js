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
    imageId: { type: String },
    location: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const EducationProject = mongoose.model("educationProject", projectSchema);

export default EducationProject;
