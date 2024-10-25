import mongoose from "mongoose";
import { Event } from "../model/Event.model.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ contents: events });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEvents = async (req, res) => {
  try {
    const { title, description, location, date, logoImage } = req.body;
    if (!title || !description || !location || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      logoImage,
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
    const { title, description, location, date, logoImage } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event id" });
    }
    if (!title || !description || !location || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        date,
        logoImage,
      },
      { new: true }
    );
    res.status(200).json({ message: "Event updated successfully!" });
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
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
