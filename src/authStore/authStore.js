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
      console.log("Attempting to remove adminToken cookie...");
      const cookies = new Cookies();
      cookies.remove("adminToken", {
        path: "/",
        domain: "movie-ticket-booking-server.onrender.com",
      });
      console.log("Cookie removal attempted.");
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(
            /=.*/,
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=movie-ticket-booking-server.onrender.com"
          );
      });
      console.log("Cookie removal attempted again.");

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
