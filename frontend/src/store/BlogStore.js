import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL, handlePromise } from "../utils";

export const useBlogStore = create((set) => ({
  blogs: null,
  blog: null,
  createBlog: async ({ title, description, videoURL, imageFiles }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoURL", videoURL);

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("imageFiles", imageFiles[i]);
      }

      const response = await axios.post(`${BACKEND_URL}/api/blogs`, formData);
      if (response) {
        set({ blogs: null });
        toast.success("Post created!");
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
      throw error;
    }
  },
  getBlogs: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blogs`);
      if (response) {
        set({ blogs: response.data.contents });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getBlogDetails: async (id) => {
    const [err, res] = await handlePromise(
      axios.get(`${BACKEND_URL}/api/blogs/details/${id}`)
    );

    if (res) {
      set({ blog: res.data.content[0] });
    }
    if (err) {
      console.log(err);
      throw err;
    }
  },
  updateBlog: async (
    id,
    { title, description, videoURL, imageFiles, media, removeImagesId }
  ) => {
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("videoURL", videoURL);
      form.append("media", JSON.stringify(media));

      for (let i = 0; i < removeImagesId.length; i++) {
        form.append("removeImagesId", removeImagesId[i]);
      }

      for (let i = 0; i < imageFiles.length; i++) {
        form.append("imageFiles", imageFiles[i]);
      }

      const response = await axios.patch(
        `${BACKEND_URL}/api/blogs/${id}`,
        form
      );
      if (response) {
        set({ blogs: null });
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  deleteBlog: async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/blogs/${id}`);
      if (response) {
        set({ blogs: null });
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));
