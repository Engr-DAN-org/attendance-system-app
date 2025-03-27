import { AuthState } from "../interfaces/authState";
import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (token, expiry, role, email) => {
    Cookies.set("authToken", token, {
      expires: new Date(expiry),
      secure: true,
      sameSite: "Strict",
    });

    set({ user: { token, expiry, role, email } });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  logout: () => {
    // Remove token from cookies
    Cookies.remove("authToken");
    // Remove token from axios headers
    delete axios.defaults.headers.common["Authorization"];
    // clear zustand state
    set(() => ({
      user: null,
    }));
  },
  isAuthenticated: () => {
    const token = Cookies.get("authToken");
    return !!token;
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
}));
