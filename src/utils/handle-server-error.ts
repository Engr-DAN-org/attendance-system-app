import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleServerError(error: unknown) {
  let errMsg = "Something went wrong!";

  // Check if the error is an AxiosError
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    // Prefer message or title from server
    errMsg = data?.message || data?.title || errMsg;

    switch (status) {
      case 304:
        errMsg = "Content not modified.";
        break;
      case 400:
        errMsg = errMsg || "Bad request.";
        break;
      case 401:
        errMsg = "Unauthorized. Please login.";
        break;
      case 403:
        errMsg = "Forbidden. You do not have access.";
        break;
      case 404:
        errMsg = "Not found.";
        break;
      case 409:
        errMsg = errMsg || "Conflict. Duplicate entry.";
        break;
      case 422:
        errMsg = "Validation failed.";
        break;
      case 500:
        errMsg = "Internal server error.";
        break;
    }
  } else if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    Number(error.status) === 204
  ) {
    errMsg = "Content not found.";
  }

  toast.error(errMsg);
}
