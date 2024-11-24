import { create } from "zustand";

export const useLanguage = create((set) => ({
  language: null,
  changeLanguage: (language) => {
    localStorage.setItem("language", JSON.stringify(language));
    set({ language: language });
  },
  getCurrentLanguage: () => {
    const language = JSON.parse(localStorage.getItem("language"));
    set({ language: language });
  },
}));
