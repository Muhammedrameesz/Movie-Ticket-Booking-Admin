import { create } from "zustand";
import verifyAdmin from "../utils/verifyAdmin";
import Cookies from "universal-cookie";
import { baseUrl } from "../basicurl/baseurl";
import axios from "axios";

const useAuthStore = create((set) => ({
  isAuth: false,
  loading: true,

  login: async () => {
    try {
      await verifyAdmin();
      set({ isAuth: true, loading: false });
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ isAuth: false, loading: false });
    }
  },

  signup: async () => {
    try {
      await verifyAdmin();
      set({ isAuth: true, loading: false });
    } catch (error) {
      console.error("Token verification failed:", error);
      set({ isAuth: false, loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${baseUrl}/admins/logout`, {}, { withCredentials: true });
      set({ isAuth: false });
      const event = new Event("logout");
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
  

  checkAuth: async () => {
    try {
      await verifyAdmin();
      set({ isAuth: true, loading: false });
    } catch (error) {
      set({ isAuth: false, loading: false });
    }
  },
}));

export default useAuthStore;
