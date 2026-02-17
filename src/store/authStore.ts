import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthState } from "@/interfaces/types/auth";
import { withDelayAsync } from "@/utils/timeout";
import { getCookieOptions } from "@/utils/environment";
import { UserRole, UserRoleType } from "@/enums/userRole";
import { User } from "@/interfaces/types/user";

export type AuthStoreType = ReturnType<typeof useAuthStore.getState>;
// Create Zustand store
export const useAuthStore = create<AuthState>((set, get) => {
  // Load initial auth state from cookies
  const token: string | null = Cookies.get("authToken") || null;
  const expiry: number = Number(Cookies.get("authExpiry")) || 0;

  // Ensure valid token
  const validToken = token && Number(expiry) > Date.now() ? token : null;

  if (validToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${validToken}`;
  }

  return {
    user: null,
    setUser: (user?: User | null) => set({ user }),
    profileIndex: 0,
    setProfileIndex: (index: number) => set({ profileIndex: index }),
    login: async ({ auth, navigate }) => {
      const { expiry, token, user } = auth;

      const expiryDate = new Date(expiry);
      const expiryTimeStamp = expiryDate.getTime().toString();
      const cookieOptions = getCookieOptions(expiryDate);

      // Store auth data in cookies
      Cookies.set("authToken", token, cookieOptions);
      Cookies.set("authExpiry", expiryTimeStamp, cookieOptions);

      // Set auth header globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ user: user });

      // console.log("Login token:", token);
      // console.log("Login expiry:", expiryDate);
      // console.log("Login user:", user);
      // console.log("Login expiry timestamp:", expiryTimeStamp);

      // Redirect to role-based route
      await withDelayAsync(() => navigate(get().getRedirectPath()));
    },

    logout: async (navigate) => {
      // Remove auth data from cookies
      Cookies.remove("authToken");
      Cookies.remove("authExpiry");

      // Remove auth header globally
      delete axios.defaults.headers.common["Authorization"];

      await withDelayAsync(() => {
        // Clear Zustand state
        set(() => ({ user: null }));
        navigate({ to: "/sign-in" });
      });
    },

    isAuthenticated: () => {
      const token = Cookies.get("authToken");
      const expiryTimestamp = Number(Cookies.get("authExpiry")) || 0;

      return !!token && expiryTimestamp > Date.now();
    },

    getRedirectPath: () => {
      const role: UserRoleType | undefined = get().user?.role;
      if (role == UserRole.Teacher) return "/teacher";
      if (role == UserRole.Admin) return "/admin";
      return "/student";
    },

    // Role check functions
    isAdmin: () => get().user?.role == UserRole.Admin,
    isTeacher: () => get().user?.role == UserRole.Teacher,
    isStudent: () => get().user?.role == UserRole.Student,
  };
});
