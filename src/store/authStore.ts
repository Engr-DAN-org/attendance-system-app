import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthState } from "@/interfaces/auth";

export const useAuthStore = create<AuthState>((set) => {
  const token = Cookies.get("authToken") || null;
  const expiry = Cookies.get("authExpiry") || "";
  const role = Cookies.get("authRole") || "";
  const email = Cookies.get("authEmail") || "";

  const validToken = token && token !== "" ? token : null; // Ensure a valid token

  if (validToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return {
    user: validToken ? { token, expiry, role, email } : null,

    login: (token, expiry, role, email) => {
      const expiryDate = new Date(expiry);
      const expiryTimeStamp = expiryDate.getTime();

      Cookies.set("authToken", token, {
        expires: expiryDate,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("authRole", role, {
        expires: expiryDate,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("authEmail", email, {
        expires: expiryDate,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("authExpiry", expiryTimeStamp.toString(), {
        expires: expiryDate,
        secure: true,
        sameSite: "Strict",
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ user: { token, expiry, role, email } });
    },

    logout: () => {
      // Remove token from cookies
      Cookies.remove("authToken");
      Cookies.remove("authRole");
      Cookies.remove("authEmail");
      Cookies.remove("authExpiry");
      // Remove token from axios headers
      delete axios.defaults.headers.common["Authorization"];
      // clear zustand state
      set(() => ({
        user: null,
      }));
    },

    isAuthenticated: () => {
      const token = Cookies.get("authToken");
      const expiryTimestamp = Number(Cookies.get("authExpiry")) || 0;

      if (!token || expiryTimestamp < Date.now()) {
        // get().logout();
        return false;
      }

      return true;
    },

    //   isAdmin: () => {

    //     return get().user?.role === "admin";
    //   },
    //   isUser: () => {
    //     return get().user?.role === "user";
    //   },
    //   isTeacher: () => {
    //     return get().user?.role === "teacher";
    //   },
    //   isStudent: () => {
    //     return get().user?.role === "student";
    //   },
  };
});
