import { create } from "zustand";
import { BACKEND_URL, handlePromise } from "../utils";
import axios from "axios";
import { toast } from "react-toastify";

export const useEduProjectStore = create((set) => ({
  projects: null,
  project: null,
  getAllProjects: async () => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/edu-projects`)
    );
    if (err) {
      throw err;
    }
    if (res) {
      set({ projects: res.data.contents });
      return res;
    }
  },
  createProject: async ({ title, description, logoImage, location, date }) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("imageFile", logoImage);
    formData.append("location", location);
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
    { title, description, logoImage, location, date }
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("logoImage", logoImage);
    formData.append("location", location);
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
