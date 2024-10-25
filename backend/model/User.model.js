import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birth: { type: Date, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    location: { type: String, required: true },
    isVerified: { type: Boolean, default: false, required: true },
    verificationToken: String,
    verificationExp: Date,
    resetToken: { type: String, default: null },
    resetTokenExp: { type: Date, default: null },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "member", "user"],
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Student",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
