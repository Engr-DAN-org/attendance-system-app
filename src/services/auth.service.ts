import axios from "../utils/axiosSetup";
import { LoginDTO, Verify2faDTO } from "../interfaces/auth";
import { AuthResponseDTO, ResponseDTO } from "../interfaces/responseDTO";

const coldStart = async () => {
  return await axios.get("/coldStart");
};

const login = async (loginDTO: LoginDTO): Promise<ResponseDTO> => {
  return await axios.post("/auth/login", loginDTO);
};

const verify2fa = async (
  verify2faDTO: Verify2faDTO
): Promise<AuthResponseDTO> => {
  return await axios.post("/auth/verify-2fa", verify2faDTO);
};

export { coldStart, login, verify2fa };
