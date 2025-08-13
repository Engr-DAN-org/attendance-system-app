import api from "@/lib/axiosSetup";
import {
  LoginDTO,
  PasswordResetForm,
  Verify2faDTO,
} from "@/interfaces/types/auth";
import {
  AuthResponseDTO,
  FailedLoginResponseDTO,
  SuccessLoginResponseDTO,
} from "@/interfaces/types/responseDTO";
import { AxiosResponse } from "axios";
import { User, UserCredForm } from "@/interfaces/types/user";

const coldStart = async (): Promise<object> => {
  const response = await api.get("/coldStart");
  return response.data;
};

const loginAsync = async (
  loginDTO: LoginDTO
): Promise<SuccessLoginResponseDTO | FailedLoginResponseDTO> => {
  const response: AxiosResponse<SuccessLoginResponseDTO> = await api.post(
    "/auth/login",
    loginDTO
  );
  return response.data;
};

const resendCodeAsync = async (email: string): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await api.post(
    "/auth/resend-2fa",
    { email }
  );
  return response.data;
};

const sendForgotPasswordEmailAsync = async (
  email: string
): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await api.post(
    "/auth/forgot-password",
    { email }
  );
  return response.data;
};

const verify2faAsync = async (
  verify2faDTO: Verify2faDTO
): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await api.post(
    "/auth/verify-2fa",
    verify2faDTO
  );
  return response.data;
};

const getProfileAsync = async (): Promise<User> => {
  const response: AxiosResponse<User> = await api.get("/auth/profile");
  return response.data;
};

const updateProfileAsync = async (data: UserCredForm) => {
  const response: AxiosResponse<User> = await api.put(
    "auth/profile/update",
    data
  );

  return response.data;
};

const changePasswordAsync = async (data: PasswordResetForm) => {
  const response: AxiosResponse<User> = await api.put(
    "auth/profile/change-password",
    data
  );

  return response.data;
};

const sendForgotPassword = async (email: string): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await api.post(
    "/auth/forgot-password",
    { email }
  );
  return response.data;
};

const resetPasswordAsync = async (data: {
  email: string;
  code: string;
}): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await api.post(
    "/auth/reset-password",
    data
  );
  return response.data;
};

export {
  coldStart,
  loginAsync,
  verify2faAsync,
  resendCodeAsync,
  getProfileAsync,
  updateProfileAsync,
  changePasswordAsync,
  sendForgotPasswordEmailAsync,
  sendForgotPassword,
  resetPasswordAsync,
};
