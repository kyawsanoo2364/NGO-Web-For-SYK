import { create } from "zustand";
import { toast } from "react-toastify";
import { BACKEND_URL, PasswordChecker } from "../utils";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${BACKEND_URL}/api/users/user`);

      if (response) {
        set({ user: response.data.user, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      console.log(error);
    }
  },
  signup: async ({
    fullName,
    email,
    phone,
    gender,
    location,
    password,
    confirmPassword,
    birth,
  }) => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !gender ||
      !location ||
      !password ||
      !confirmPassword ||
      !birth
    ) {
      toast.error("All fields are required!");
      return;
    }
    try {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Password do not match!");
        return;
      }
      if (!PasswordChecker.isValid(password)) return;
      set({ isLoading: true });
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        fullName,
        email,
        password,
        gender,
        phone,
        location,
        birth,
        confirmPassword,
      });
      toast.success("Registered successfully!");

      set({ isLoading: false, user: res.data.user });
      return res;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.message);
      throw new Error(error);
    }
  },
  verifyEmail: async ({ userId, code }) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/verify/${userId}`,
        { code }
      );
      if (response) {
        set({ isLoading: false });
        toast.success(response.data.message);
      }
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isLoading: false });
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      if (!email || !password) {
        return toast.error("All fields are required!");
      }
      set({ isLoading: true });
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response) {
        set({ isLoading: false, user: response.data.user });
        toast.success("Login Successfully!");
      }
      return response;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.message);
      throw error;
    }
  },
  logout: async () => {
    try {
      const res = await toast.promise(
        axios.post(`${BACKEND_URL}/api/auth/logout`),
        {
          pending: "waiting for Logout",
          success: "Logout successfully",
          error: "Logout error",
        }
      );
      if (res) set({ user: null });
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (email) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/forgotPassword`,
        { email }
      );
      if (response) {
        set({ isLoading: false });
        return response;
      }
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.message);
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      if (PasswordChecker.isValid(newPassword)) {
        set({ isLoading: true });
        const response = await axios.post(
          `${BACKEND_URL}/api/auth/resetPassword/${token}`,
          { newPassword }
        );
        if (response) {
          set({ isLoading: false });
          toast.success(response.data.message);
          return response;
        }
      }
      return;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));
