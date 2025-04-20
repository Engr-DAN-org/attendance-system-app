import { LinkProps } from "@tanstack/react-router";
import { User } from "./user";
import { AuthResponseDTO } from "./responseDTO";

interface AuthState {
  user: User | null;
  profileIndex: number;
  setProfileIndex: (index: number) => void;
  setUser: (user: User | null) => void;
  login: (response: {
    auth: AuthResponseDTO;
    navigate: (path: LinkProps["to"]) => void;
  }) => void;
  logout: (navigate: (options: { to: LinkProps["to"] }) => void) => void;
  isAuthenticated: () => boolean;
  getRedirectPath: () => LinkProps["to"];
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
}

interface LoginDTO {
  emailOrIdNo: string;
  password: string;
}

interface Verify2faDTO {
  email: string;
  code: string;
}

// interface authRoutes{

// }

export type { AuthState, LoginDTO, Verify2faDTO };
