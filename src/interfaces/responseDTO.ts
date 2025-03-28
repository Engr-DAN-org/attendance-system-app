interface ResponseDTO {
  responseType: string;
  message: string;
}

interface AuthResponseDTO extends ResponseDTO {
  role: string;
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
