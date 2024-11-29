import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title_en: {
      type: String,
      required: true,
    },
    description_en: {
      type: String,
      required: true,
    },
    title_mm: {
      type: String,
      required: true,
    },
    description_mm: {
      type: String,
      required: true,
    },
    logoImage: { type: String, default: "" },
    imageId: { type: String },
    location_en: { type: String, required: true },
    location_mm: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const EducationProject = mongoose.model("educationProject", projectSchema);

export default EducationProject;
