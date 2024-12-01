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
    heroTitle_en,
    heroDescription_en,
    heroTitle_mm,
    heroDescription_mm,
    heroBackgroundImage,
    bgFile,
    about_en,
    about_mm,
    activityVideoUrl,
    mission_en,
    vision_en,
    mission_mm,
    vision_mm,
    phone,
    email,
    facebook,
    telegram,
    contactBg,
  }) => {
    try {
      const form = new FormData();
      form.append("heroTitle_en", heroTitle_en);
      form.append("heroDescription_en", heroDescription_en);
      form.append("heroTitle_mm", heroTitle_mm);
      form.append("heroDescription_mm", heroDescription_mm);
      form.append("heroBackgroundImage", heroBackgroundImage);
      form.append("bgFile", bgFile);
      form.append("about_en", about_en);
      form.append("about_mm", about_mm);
      form.append("activityVideoUrl", activityVideoUrl);
      form.append("mission_en", mission_en);
      form.append("vision_en", vision_en);
      form.append("mission_mm", mission_mm);
      form.append("vision_mm", vision_mm);
      form.append("phone", phone);
      form.append("email", email);
      form.append("facebook", facebook);
      form.append("telegram", telegram);
      form.append("contactBg", contactBg);
      set({ isHomeUpdateLoading: true });
      const response = await axios.patch(
        `${BACKEND_URL}/api/home/6744552d56678a55959234d6`,
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
