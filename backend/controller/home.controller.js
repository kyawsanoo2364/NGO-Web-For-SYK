import mongoose from "mongoose";
import Home from "../model/Home.model.js";
import { IsCheckUrl } from "../utils/IsCheckText.mjs";

export const getHomePage = async (req, res) => {
  try {
    const home = await Home.find({});
    res.status(200).json({ contents: home, success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error!", success: true });
  }
};

export const createHomePage = async (req, res) => {
  try {
    const {
      heroTitle_en,
      heroDescription_en,
      heroTitle_mm,
      heroDescription_mm,
      heroBackgroundImage,
      about_en,
      vision_en,
      mission_en,
      about_mm,
      vision_mm,
      mission_mm,
      phone,
      email,
      facebook,
      twitter,
      indeed,
      telegram,
      instagram,
      activityVideoUrl,
    } = req.body;

    const home = new Home({
      hero: {
        title_en: heroTitle_en,
        subTitle_en: heroDescription_en,
        title_mm: heroTitle_mm,
        subTitle_mm: heroDescription_mm,
        backgroundImage: heroBackgroundImage,
      },
      about_en,
      vision_en,
      mission_en,
      about_mm,
      vision_mm,
      mission_mm,
      activityVideoUrl,

      contacts: {
        phone: phone,
        email: email,
        facebook: facebook,
        twitter: twitter,
        indeed: indeed,
        instagram: instagram,
        telegram: telegram,
      },
    });
    await home.save();

    res.status(201).json({
      message: "Home page information created successfully!",
      contents: home,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const UpdateHomePage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }
    const {
      heroTitle_en,
      heroDescription_en,
      about_en,
      vision_en,
      mission_en,
      heroTitle_mm,
      heroDescription_mm,
      about_mm,
      vision_mm,
      mission_mm,
      activityVideoUrl,

      phone,
      email,
      facebook,
      twitter,
      indeed,
      instagram,
      telegram,
    } = req.body;
    if (
      !heroTitle_en ||
      !heroDescription_en ||
      !about_en ||
      !vision_en ||
      !mission_en ||
      !heroTitle_mm ||
      !heroDescription_mm ||
      !about_mm ||
      !vision_mm ||
      !mission_mm ||
      !activityVideoUrl ||
      !phone ||
      !email ||
      !req.heroBackgroundImage
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (facebook && !IsCheckUrl(facebook)) {
      res.status(400).json({ message: "Incorrect Url Or No found Link Url" });
      return;
    }
    if (instagram && !IsCheckUrl(instagram)) {
      res.status(400).json({ message: "Incorrect Url Or No found Link Url" });
      return;
    }
    if (twitter && !IsCheckUrl(twitter)) {
      res.status(400).json({ message: "Incorrect Url Or No found Link Url" });
      return;
    }
    if (indeed && !IsCheckUrl(indeed)) {
      res.status(400).json({ message: "Incorrect Url Or No found Link Url" });
      return;
    }
    const home = await Home.findByIdAndUpdate(
      id,
      {
        $set: {
          hero: {
            title_en: heroTitle_en,
            subTitle_en: heroDescription_en,
            title_mm: heroTitle_mm,
            subTitle_mm: heroDescription_mm,
            backgroundImage: req.heroBackgroundImage,
          },
          about_en,
          vision_en,
          mission_en,
          about_mm,
          vision_mm,
          mission_mm,
          activityVideoUrl,

          contacts: {
            phone,
            email,
            facebook,
            twitter,
            telegram,
            indeed,
            instagram: instagram,
          },
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ content: home, message: "Home Page updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
