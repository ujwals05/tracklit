import { create } from "zustand";
import { axiosInstance } from "../utils/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfilePic: false,
  isCheckingAuth: true,
  isDeletingUser: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");
      console.log(res);
      set({ authUser: res.data });
    } catch (error) {
      console.log("No user exist", error);
      set({ authUser: null });
    }
  },

  signup: async (data) =>{
    try {
      
    } catch (error) {
      console.log("Error while singup"),
      s
    }
  }
}));
