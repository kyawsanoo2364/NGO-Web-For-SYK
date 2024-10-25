import bcryptjs from "bcryptjs";
import { validatePhoneNumberE164 } from "../utils/checkPhoneNumber.js";
import User from "../model/User.model.js";
import GenerateVerifyCode from "../utils/GenerateVerifyCode.js";
import mongoose from "mongoose";
import {
  resetPasswordEmail,
  verificationEmail,
} from "../utils/mailtrap/emails.js";
import "dotenv/config";
import GenerateTokenAndCookie from "../utils/GenerateTokenAndCookie.js";
import Base64 from "crypto-js/enc-base64.js";
import Utf8 from "crypto-js/enc-utf8.js";
import { resetPasswordEmailTemplate } from "../utils/mailtrap/emailTemplate.js";

export const signupController = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      location,
      gender,
      birth,
      phone,
    } = req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !birth ||
      !phone ||
      !gender ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      if (!existUser.isVerified) {
        await User.findByIdAndDelete(existUser._id);
      } else if (existUser.isVerified) {
        return res.status(400).json({
          message: "Account has already created! Please Login.",
          success: false,
        });
      }
    }

    if (!validatePhoneNumberE164(phone)) {
      return res.status(400).json({ message: "Invalid Phone number!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password do not match!", success: false });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
        success: false,
      });
    }
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{6,}$/;
    if (regex.test(password)) {
      const hashedPwd = await bcryptjs.hash(password, 10);
      const verifyCode = GenerateVerifyCode();

      const verifyExp = new Date(Date.now() + 60 * 60 * 1000);
      const newUser = new User({
        fullName,
        email,
        password: hashedPwd,
        phone,
        birth,
        gender,
        location,
        verificationToken: verifyCode,
        verificationExp: verifyExp,
      });
      await newUser.save();
      await verificationEmail(
        { name: process.env.EMAIL_NAME, email: process.env.SENDER_EMAIL },
        email,
        verifyCode
      );
      res.status(201).json({
        user: newUser,
        message: "Account has created successfully!",
        success: true,
      });
    } else {
      return res.status(400).json({ message: "Ensure your password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    console.log(code);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid Id." });
    }
    if (code.length < 6) {
      return res.status(400).json({ message: "Invalid verify code." });
    }
    const user = await User.findOne({
      _id: id,
      verificationExp: { $gt: Date.now() },
    });
    if (!user) {
      const existUser = await User.findById(id);
      if (existUser) {
        await User.findByIdAndDelete(id);
      }
      return res.status(404).json({
        message: "Token expired or No User found! Please Sign up again.",
      });
    }
    if (code !== user.verificationToken) {
      return res.status(400).json({ message: "Incorrect Code!" });
    }
    user.verificationExp = undefined;
    user.verificationToken = undefined;
    user.isVerified = true;
    await user.save();

    res.status(201).json({ message: "Verified your account" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found! Please Sign up" });
    }
    const isCorrectPwd = await bcryptjs.compare(password, user.password);
    if (!isCorrectPwd) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Email not verification.Please register again." });
    }
    const generatedToken = GenerateTokenAndCookie(user._id, res);

    if (generatedToken) {
      res.status(200).json({
        user: { ...user._doc, password: undefined },
        message: "Login Successfully!",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("syk_token");
    res.status(200).json({ message: "Logout Successfully", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required!" });
    }
    const existsUser = await User.findOne({ email });
    if (!existsUser) {
      return res
        .status(404)
        .json({ message: "No user found! or Invalid email" });
    }
    const token = Base64.stringify(Utf8.parse(email + " Love you guy!"));
    const forgotPwdExp = new Date(Date.now() + 15 * 60 * 1000);
    existsUser.resetToken = token;
    existsUser.resetTokenExp = forgotPwdExp;
    await existsUser.save();
    //send email
    await resetPasswordEmail(
      {
        email: process.env.SENDER_EMAIL,
        name: process.env.EMAIL_NAME,
      },
      existsUser.email,
      existsUser.fullName,
      `${process.env.FRONTEND_URL}/resetPassword/${existsUser.resetToken}`
    );
    res
      .status(200)
      .json({ message: "We send to email reset password for your account" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ message: "Reset Token Expired" });
    }
    if (!newPassword) {
      return res.status(400).json({ message: "New Password required!" });
    }
    const hashedPwd = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPwd;
    user.resetToken = null;
    user.resetTokenExp = null;
    await user.save();
    res.status(201).json({ message: "Password change successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
