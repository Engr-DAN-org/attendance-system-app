import axios from "@/utils/axiosSetup";
import { LoginDTO, Verify2faDTO } from "@/interfaces/auth";
import {
  AuthResponseDTO,
  FailedLoginResponseDTO,
  SuccessLoginResponseDTO,
} from "@/interfaces/responseDTO";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const coldStart = async () => {
  return await axios.get("/coldStart");
};

const loginAsync = async (
  loginDTO: LoginDTO
): Promise<SuccessLoginResponseDTO | FailedLoginResponseDTO> => {
  const response: AxiosResponse<SuccessLoginResponseDTO> = await axios.post(
    "/auth/login",
    loginDTO
  );
  return response.data;
};

const verify2faAsync = async (
  verify2faDTO: Verify2faDTO
): Promise<AuthResponseDTO> => {
  const response: AxiosResponse<AuthResponseDTO> = await axios.post(
    "/auth/verify-2fa",
    verify2faDTO
  );
  return response.data;
};

const logout = () => {
  Cookies.remove("authToken");
  Cookies.remove("expiry");
  Cookies.remove("role");
  Cookies.remove("email");
  Cookies.remove("user");
};

export { coldStart, loginAsync, verify2faAsync, logout };
