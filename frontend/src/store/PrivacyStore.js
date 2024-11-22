import { create } from "zustand";
import { BACKEND_URL, handlePromise } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

export const usePrivacyStore = create((set) => ({
  privacyPolicy: null,
  createPrivacy: async ({ content }) => {
    const [err, res] = await handlePromise(
      axios.post(`${BACKEND_URL}/api/privacyPolicy`, { content })
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set({ privacyPolicy: res.data.content });
    }
  },
  getPrivacy: async () => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/privacyPolicy`)
    );
    if (err) {
      throw err;
    }
    if (res) {
      set({ privacyPolicy: res.data.content });
      return res;
    }
  },
  updatePrivacy: async (id, { content }) => {
    const [err, res] = await handlePromise(
      axios.patch(`${BACKEND_URL}/api/privacyPolicy/${id}`, { content })
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set({ privacyPolicy: res.data.content });
      return res;
    }
  },
}));
