import { create } from "zustand";
import { BACKEND_URL, handlePromise } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

export const useStaffStore = create((set) => ({
  staffs: null,
  getStaffs: async () => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/staffs`)
    );
    if (err) {
      throw err;
    }
    if (res) {
      set({ staffs: res.data.contents });
      return res;
    }
  },
  createStaff: async ({
    name,
    email,
    facebookLink,
    telegramLink,
    imageFile,
    position,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("telegramLink", telegramLink);
    formData.append("facebookLink", facebookLink);
    formData.append("imageFile", imageFile);
    formData.append("position", position);
    const [err, res] = await handlePromise(
      axios.post(`${BACKEND_URL}/api/staffs`, formData)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      toast.success("Member created successfully.");
      set((state) => ({
        staffs: [...state.staffs, res.data.content],
      }));
      return res;
    }
  },
  deleteStaff: async (id) => {
    const [err, res] = await handlePromise(
      axios.delete(`${BACKEND_URL}/api/staffs/${id}`)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set((state) => ({ staffs: state.staffs.filter((s) => s._id !== id) }));
      toast.success("Deleted!");
      return res;
    }
  },
}));
