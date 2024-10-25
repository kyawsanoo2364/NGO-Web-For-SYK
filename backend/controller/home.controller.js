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
      heroTitle,
      heroDescription,
      heroBackgroundImage,
      about,
      vision,
      mission,
      goal,
      partnership,
      phone,
      email,
      facebook,
      twitter,
      indeed,
      instagram,
    } = req.body;
    const home = new Home({
      hero: {
        title: heroTitle,
        subTitle: heroDescription,
        backgroundImage: heroBackgroundImage,
      },
      about,
      vision,
      mission,
      goal,
      partnership,
      contact: { phone, email, facebook, twitter, indeed, instagram },
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
      heroTitle,
      heroDescription,
      heroBackgroundImage,
      about,
      vision,
      mission,
      goal,
      partnership,
      phone,
      email,
      facebook,
      twitter,
      indeed,
      instagram,
    } = req.body;

    if (
      !heroTitle ||
      !heroDescription ||
      !heroBackgroundImage ||
      !about ||
      !vision ||
      !mission ||
      !goal ||
      !phone ||
      !email
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
            title: heroTitle,
            subTitle: heroDescription,
            backgroundImage: heroBackgroundImage,
          },
          about,
          vision,
          mission,
          goal,
          partnership,
          contacts: {
            phone,
            email,
            facebook,
            twitter,
            indeed,
            Instagram: instagram,
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
