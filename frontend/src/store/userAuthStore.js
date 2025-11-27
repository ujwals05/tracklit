import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfilePic: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      set({ authUser: res.data.user, isCheckingAuth: false });
    } catch (err) {
      set({ authUser: null, isCheckingAuth: false });
    }
  },


  signup: async (formData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      toast.success("Signup successful!");
      set({ authUser: res.data.data.user });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  signin: async (formData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/signin", formData);
      toast.success("Login successful!");
      set({ authUser: res.data.data });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  googleLogin: () => {
    window.location.href = "http://localhost:8002/api/auth/google";
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logged out");
      set({ authUser: null });
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  updateProfilePic: async (file) => {
    set({ isUpdatingProfilePic: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.put(
        "/auth/update-profile-pic",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Profile updated!");
      set({ authUser: res.data.data });
    } catch (err) {
      toast.error("Update failed");
    } finally {
      set({ isUpdatingProfilePic: false });
    }
  },
}));
