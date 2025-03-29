import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthState } from "@/interfaces/auth";
import { withDelayAsync } from "@/utils/timeout";

// Create Zustand store
export const useAuthStore = create<AuthState>((set, get) => {
  // Load initial auth state from cookies
  const token = Cookies.get("authToken") || null;
  const expiry = Number(Cookies.get("authExpiry")) || 0;
  const role = Cookies.get("authRole") || "";
  const email = Cookies.get("authEmail") || "";

  // Ensure valid token
  const validToken = token && Number(expiry) > Date.now() ? token : null;

  if (validToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${validToken}`;
  }

  return {
    user: validToken ? { token, expiry, role, email } : null,

    login: async ({ token, expiry, role, email, navigate }) => {
      const expiryDate = new Date(expiry);
      const expiryTimeStamp = expiryDate.getTime().toString();

      // Store auth data in cookies
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
      Cookies.set("authExpiry", expiryTimeStamp, {
        expires: expiryDate,
        secure: true,
        sameSite: "Strict",
      });

      // Set auth header globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ user: { token, expiry: Number(expiryTimeStamp), role, email } });

      // Redirect to role-based route
      await withDelayAsync(() => navigate(get().getRedirectPath()));
    },

    logout: async (navigate, redirect) => {
      // Remove auth data from cookies
      Cookies.remove("authToken");
      Cookies.remove("authRole");
      Cookies.remove("authEmail");
      Cookies.remove("authExpiry");

      // Remove auth header globally
      delete axios.defaults.headers.common["Authorization"];

      // Clear Zustand state
      set(() => ({ user: null }));

      await withDelayAsync(() =>
        navigate({ to: "/sign-in", search: redirect })
      );
    },

    isAuthenticated: () => {
      const token = Cookies.get("authToken");
      const expiryTimestamp = Number(Cookies.get("authExpiry")) || 0;

      return !!token && expiryTimestamp > Date.now();
    },

    getRedirectPath: () => {
      const role = get().user?.role;
      if (role == "Teacher") return "/teacher/dashboard";
      if (role == "Admin") return "/admin/dashboard";
      return "/student/dashboard";
    },

    // Role check functions
    isAdmin: () => get().user?.role === "Admin",
    isTeacher: () => get().user?.role === "Teacher",
    isStudent: () => get().user?.role === "Student",
  };
});
