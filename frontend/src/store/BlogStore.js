import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL, handlePromise } from "../utils";

export const useBlogStore = create((set) => ({
  blogs: null,
  blog: null,
  createBlog: async ({
    title_en,
    title_mm,
    description_en,
    description_mm,
    videoURL,
    imageFiles,
  }) => {
    try {
      const formData = new FormData();
      formData.append("title_en", title_en);
      formData.append("title_mm", title_mm);
      formData.append("description_en", description_en);
      formData.append("description_mm", description_mm);
      formData.append("videoURL", videoURL);

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("imageFiles", imageFiles[i]);
      }

      const response = await axios.post(`${BACKEND_URL}/api/blogs`, formData);
      if (response) {
        set((state) => ({ blogs: [...state.blogs, response.data.content] }));
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
  setBlogs: async (data) => {
    set({ blogs: data });
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
    {
      title_en,
      title_mm,
      description_en,
      description_mm,
      videoURL,
      imageFiles,
      media,
      removeImagesId,
    }
  ) => {
    try {
      const form = new FormData();
      form.append("title_en", title_en);
      form.append("description_en", description_en);
      form.append("title_mm", title_mm);
      form.append("description_mm", description_mm);
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
        set((state) => ({
          blogs: state.blogs.map((b) =>
            b._id === id ? { ...b, ...response.data.content } : b
          ),
        }));
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
        set((state) => ({ blogs: state.blogs.filter((b) => b._id !== id) }));
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
}));
