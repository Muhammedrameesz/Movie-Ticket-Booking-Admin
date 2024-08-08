import { create } from "zustand";
import verifyAdmin from "../utils/verifyAdmin";
import Cookies from "js-cookie";

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

  logout: () => {
    Cookies.remove("adminToken");
    set({ isAuth: false });
    // Dispatch custom event
    const event = new Event("logout");
    window.dispatchEvent(event);
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
