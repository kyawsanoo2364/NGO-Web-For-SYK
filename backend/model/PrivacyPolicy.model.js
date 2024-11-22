import mongoose from "mongoose";

const PrivacyPolicySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", PrivacyPolicySchema);

export default PrivacyPolicyModel;
