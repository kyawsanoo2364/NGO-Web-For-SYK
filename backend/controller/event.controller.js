import mongoose from "mongoose";
import { Event } from "../model/Event.model.js";
import removeImageFromCloudinary from "../utils/removeImageFromCloudinary.js";

export const getAllEvents = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const events = await Event.find({})
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ contents: events });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "Invalid Event Id." });
    }
    const data = await Event.findById(id);
    res.status(200).json({ content: data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEvents = async (req, res) => {
  try {
    const {
      title_en,
      title_mm,
      description_en,
      description_mm,
      location_en,
      location_mm,
      date,
      time,
    } = req.body;
    if (
      !title_en ||
      !title_mm ||
      !description_en ||
      !description_mm ||
      !location_en ||
      !location_mm ||
      !date ||
      !time ||
      !req.imageUrl ||
      !req.imageId
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const newEvent = new Event({
      title_en,
      title_mm,
      description_en,
      description_mm,
      location_en,
      location_mm,
      date,
      image: req.imageUrl,
      imageId: req.imageId,
      time,
    });
    await newEvent.save();
    res.status(200).json({ message: "New Event created", content: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title_en,
      title_mm,
      description_en,
      description_mm,
      location_en,
      location_mm,
      date,
      time,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    if (
      !title_en ||
      !title_mm ||
      !description_en ||
      !description_mm ||
      !location_en ||
      !location_mm ||
      !date ||
      !time ||
      !req.imageUrl ||
      !req.imageId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const event = await Event.findByIdAndUpdate(
      id,
      {
        title_en,
        title_mm,
        description_en,
        description_mm,
        location_en,
        location_mm,
        date,
        image: req.imageUrl,
        imageId: req.imageId,
        time,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Event updated successfully!", content: event });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }
    const event = await Event.findById(id);
    const d = await removeImageFromCloudinary(event.imageId);
    if (d) {
      await Event.findByIdAndDelete(id);
      res.status(200).json({ message: "Event deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
