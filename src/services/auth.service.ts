import api from "@/lib/axiosSetup";
import { LoginDTO, Verify2faDTO } from "@/interfaces/types/auth";
import {
  AuthResponseDTO,
  FailedLoginResponseDTO,
  SuccessLoginResponseDTO,
} from "@/interfaces/types/responseDTO";
import { AxiosResponse } from "axios";
import { User } from "@/interfaces/types/user";

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

export { coldStart, loginAsync, verify2faAsync, getProfileAsync };
