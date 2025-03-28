interface AuthState {
  user: AuthUser | null;
  login: (token: string, expiry: string, role: string, email: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  //   isAdmin: () => boolean;
  //   isUser: () => boolean;
  //   isTeacher: () => boolean;
  //   isStudent: () => boolean;
}

interface AuthUser {
  token: string | null;
  expiry: string;
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
