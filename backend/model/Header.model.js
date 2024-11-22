// Header ဆိုတာက Logo Image နဲ့ Company Name တွေကို သိုလှောင်မဲ့ နေရာ

import mongoose from "mongoose";

const headerSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Header = mongoose.model("Header", headerSchema);

export default Header;
