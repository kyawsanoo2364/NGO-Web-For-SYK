import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    imageUrl: String,
    imageId: String,
    telegramLink: String,
    facebookLink: String,
    position: String,
  },
  { timestamps: true }
);

const StaffModel = mongoose.model("staffs", StaffSchema);

export default StaffModel;
