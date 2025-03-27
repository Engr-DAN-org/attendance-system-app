interface ResponseDTO {
  status: number;
  message?: string;
  data?: object | unknown;
}

interface AuthResponseDTO extends ResponseDTO {
  data?: {
    role: string;
    expiry: string;
    token: string;
  };
}

export type { ResponseDTO, AuthResponseDTO };
