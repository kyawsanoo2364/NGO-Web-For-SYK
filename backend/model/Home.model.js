import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  hero: {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    backgroundImage: { type: String, required: true },
  },
  about: {
    type: String,
    required: true,
  },
  vision: { type: String, required: true },
  mission: { type: String, required: true },
  activityVideoUrl: { type: String },

  contacts: {
    type: Object,
  },
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
