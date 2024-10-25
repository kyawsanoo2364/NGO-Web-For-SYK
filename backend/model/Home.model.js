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
  goal: { type: String, required: true },
  partnership: { type: Array, default: [] },
  contacts: {
    phone: Array,
    email: String,
    location: String,
    facebook: { type: String, default: null },
    Instagram: { type: String, default: null },
    Indeed: { type: String, default: null },
    twitter: { type: String, default: null },
  },
});

const Home = mongoose.model("Home", homeSchema);

export default Home;
