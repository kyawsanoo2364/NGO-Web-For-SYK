import axios from "axios";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";

export const useUserStore = create((set) => ({
  users: null,
  getAllUsers: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/users`);
      if (res) {
        set({ users: res.data.users });
        return res;
      }
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}/api/users/onlyAdmin/${id}`,
        data
      );
      if (res) {
        set((state) => ({
          users: state.users.map((user) =>
            user._id === res.data.user._id ? res.data.user : user
          ),
        }));
        return res;
      }
    } catch (error) {
      throw error;
    }
  },
}));
