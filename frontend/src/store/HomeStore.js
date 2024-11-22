import { toast } from "react-toastify";
import { create } from "zustand";
import { BACKEND_URL } from "../utils";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useHomeStore = create((set) => ({
  isHeaderLoading: false,
  isHomeUpdateLoading: false,
  header: null,
  homeInfo: null,
  isHomeLoading: false,
  getHomeInfo: async () => {
    try {
      set({ isHomeLoading: true });
      const response = await axios.get(`${BACKEND_URL}/api/home`);
      if (response) {
        set({ homeInfo: response.data.contents[0], isHomeLoading: false });
      }
    } catch (error) {
      set({ isHomeLoading: false });

      throw error;
    }
  },
  getHeader: async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/header/671f541e02948e0ec55f88fc`
      );
      set({ header: response.data.content });
    } catch (error) {
      throw error;
    }
  },
  updateHeader: async (logoImage, companyName) => {
    try {
      set({ isHeaderLoading: true });
      const response = await axios.patch(
        `${BACKEND_URL}/api/header/671f541e02948e0ec55f88fc`,
        { logo: logoImage, companyName }
      );
      set({ header: response.data.content, isHeaderLoading: false });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ isHeaderLoading: false });
      throw error;
    }
  },
  updateHomePage: async ({
    heroTitle,
    heroDescription,
    heroBackgroundImage,
    bgFile,
    about,
    activityVideoUrl,
    mission,
    vision,
    phone,
    email,
    facebook,
    telegram,
  }) => {
    try {
      const form = new FormData();
      form.append("heroTitle", heroTitle);
      form.append("heroDescription", heroDescription);
      form.append("heroBackgroundImage", heroBackgroundImage);
      form.append("bgFile", bgFile);
      form.append("about", about);
      form.append("activityVideoUrl", activityVideoUrl);
      form.append("mission", mission);
      form.append("vision", vision);
      form.append("phone", phone);
      form.append("email", email);
      form.append("facebook", facebook);
      form.append("telegram", telegram);
      set({ isHomeUpdateLoading: true });
      const response = await axios.patch(
        `${BACKEND_URL}/api/home/6720bb42d1605b7a6d5160ae`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response) {
        toast.success("Home page is updated successfully!");
        set({ isHomeUpdateLoading: false, homeInfo: response.data.content });
        return response;
      }
    } catch (error) {
      set({ isHomeUpdateLoading: false });
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));
