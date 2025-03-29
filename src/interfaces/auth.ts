interface AuthState {
  user: AuthUser | null;
  login: (response: {
    token: string;
    expiry: number;
    role: string;
    email: string;
    navigate: (path: string) => void;
  }) => void;
  logout: (
    navigate: (options: { to: string; search: string }) => void,
    redirect: string
  ) => void;
  isAuthenticated: () => boolean;
  getRedirectPath: () => string;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
}

interface AuthUser {
  token: string | null;
  expiry: number;
  role: string;
  email: string;
}

interface LoginDTO {
  emailOrIdNo: string;
  password: string;
}
interface Verify2faDTO {
  email: string;
  code: string;
}

export type { AuthState, AuthUser, LoginDTO, Verify2faDTO };
