import { User } from "./user";

interface ResponseDTO {
  responseType: string;
  message: string;
}

interface AuthResponseDTO extends ResponseDTO {
  user: User;
  expiry: string;
  token: string;
}

interface FailedLoginResponseDTO extends ResponseDTO {
  responseType: string;
  message: string;
}

interface SuccessLoginResponseDTO extends ResponseDTO {
  responseType: string;
  message: string;
  email: string;
  expiry: Date;
}

export type {
  ResponseDTO,
  AuthResponseDTO,
  FailedLoginResponseDTO,
  SuccessLoginResponseDTO,
};
