import { create } from "zustand";
import { BACKEND_URL, handlePromise } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

export const usePartnershipsStore = create((set) => ({
  partnerships: null,
  getPartnerships: async () => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/partnerships`)
    );
    if (err) {
      throw err;
    }
    if (res) {
      set({ partnerships: res.data.partnerships });
      return res;
    }
  },
  createPartnership: async ({ name, webLink, imageFile }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("webLink", webLink);
    formData.append("imageFile", imageFile);
    const [err, res] = await handlePromise(
      axios.post(`${BACKEND_URL}/api/partnerships`, formData)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set((state) => ({
        partnerships: [...state.partnerships, res.data.partnership],
      }));
      return res;
    }
  },
  deletePartnership: async (id) => {
    const [err, res] = await handlePromise(
      axios.delete(`${BACKEND_URL}/api/partnerships/${id}`)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set((state) => ({
        partnerships: state.partnerships.filter((p) => p._id !== id),
      }));
      toast.success("Removed Partner.");
      return res;
    }
  },
}));
