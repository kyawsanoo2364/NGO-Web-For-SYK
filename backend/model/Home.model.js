import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  hero: {
    title_en: { type: String, required: true },
    subTitle_en: { type: String, required: true },
    title_mm: { type: String, required: true },
    subTitle_mm: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  about_en: {
    type: String,
    required: true,
  },
  about_mm: {
    type: String,
    required: true,
  },
  vision_en: { type: String, required: true },
  vision_mm: { type: String, required: true },
  mission_en: { type: String, required: true },
  mission_mm: { type: String, required: true },
  activityVideoUrl: { type: String },

  contacts: {
    type: Object,
  },
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
