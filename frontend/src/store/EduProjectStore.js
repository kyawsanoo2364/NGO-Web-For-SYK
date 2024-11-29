import { create } from "zustand";
import { BACKEND_URL, handlePromise } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

export const useEduProjectStore = create((set) => ({
  projects: null,
  project: null,
  getAllProjects: async ({ limit = 10 }) => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/edu-projects?limit=${limit}`)
    );
    if (err) {
      throw err;
    }
    if (res) {
      set({ projects: res.data.contents });
      return res;
    }
  },
  getProjectDetails: async (id) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/edu-projects/details/${id}`
      );
      if (response) {
        set({ project: response.data.content });
        return response;
      }
    } catch (error) {
      throw error;
    }
  },
  createProject: async ({
    title_en,
    title_mm,
    description_en,
    description_mm,
    logoImage,
    location_en,
    location_mm,
    date,
  }) => {
    const formData = new FormData();

    formData.append("title_en", title_en);
    formData.append("title_mm", title_mm);
    formData.append("description_en", description_en);
    formData.append("description_mm", description_mm);
    formData.append("imageFile", logoImage);
    formData.append("location_en", location_en);
    formData.append("location_mm", location_mm);
    formData.append("date", date);

    const [err, data] = await handlePromise(
      axios.post(`${BACKEND_URL}/api/edu-projects`, formData)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (data) {
      set((state) => ({ projects: [...state.projects, data.data.project] }));
      return data;
    }
  },
  deleteProject: async (id) => {
    const [err, res] = await handlePromise(
      axios.delete(`${BACKEND_URL}/api/edu-projects/${id}`)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      toast.success("Project Post Deleted!");
      set((state) => ({
        projects: state.projects?.filter((p) => p._id !== id),
      }));
      return res;
    }
  },
  updateProject: async (
    id,
    {
      title_en,
      title_mm,
      description_en,
      description_mm,
      logoImage,
      location_en,
      location_mm,
      date,
    }
  ) => {
    const formData = new FormData();
    formData.append("title_en", title_en);
    formData.append("description_en", description_en);
    formData.append("title_mm", title_mm);
    formData.append("description_mm", description_mm);
    formData.append("logoImage", logoImage);
    formData.append("location_en", location_en);
    formData.append("location_mm", location_mm);
    formData.append("date", date);
    const [err, res] = await handlePromise(
      axios.patch(`${BACKEND_URL}/api/edu-projects/${id}`, formData)
    );
    if (err) {
      toast.error(err.response.data.message);
      throw err;
    }
    if (res) {
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === res.data.project._id ? { ...p, ...res.data.project } : p
        ),
      }));
      toast.success("Project Post updated!");
      return res;
    }
  },
}));
