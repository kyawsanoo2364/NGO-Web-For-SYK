import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";

export const useEventStore = create((set) => ({
  events: null,
  createEvent: async ({
    title_en,
    title_mm,
    description_en,
    description_mm,
    location_en,
    location_mm,
    time,
    date,
    imageFile,
  }) => {
    try {
      const form = new FormData();
      form.append("title_en", title_en);
      form.append("title_mm", title_mm);
      form.append("description_en", description_en);
      form.append("description_mm", description_mm);
      form.append("imageFile", imageFile);
      form.append("location_en", location_en);
      form.append("location_mm", location_mm);
      form.append("date", date);
      form.append("time", time);
      const response = await axios.post(`${BACKEND_URL}/api/events`, form);
      if (response) {
        toast.success("Event is created successfully");
        set((state) => ({ events: [...state.events, response.data.content] }));
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getEvents: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/events`);
      if (response) {
        set({ events: response.data.contents });
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getEvent: async (id) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/events/${id}`);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.status === 404) {
        //404 not found page
        alert(error.status);
      }
      console.log(error.message);
      throw error;
    }
  },
  updateEvent: async ({
    id,
    title_en,
    title_mm,
    description_en,
    description_mm,
    imageFile,
    imageUrl,
    imageId,
    time,
    location_en,
    location_mm,
    date,
  }) => {
    try {
      const form = new FormData();
      form.append("title_en", title_en);
      form.append("title_mm", title_mm);
      form.append("description_en", description_en);
      form.append("description_mm", description_mm);
      form.append("imageFile", imageFile);
      form.append("location_en", location_en);
      form.append("location_mm", location_mm);
      form.append("date", date);
      form.append("time", time);
      form.append("imageUrl", imageUrl);
      form.append("imageId", imageId);
      const response = await axios.patch(
        `${BACKEND_URL}/api/events/${id}`,
        form
      );
      if (response) {
        toast.success("Event is updated successfully!");
        set((state) => ({
          events: state.events.map((e) =>
            e._id === response.data.content._id
              ? { ...e, ...response.data.content }
              : e
          ),
        }));
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  deleteEvent: async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/events/${id}`);
      if (response) {
        set((state) => ({ events: state.events.filter((e) => e._id !== id) }));
        toast.success("Event deleted successfully!");
        return response;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));
