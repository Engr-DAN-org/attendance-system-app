import { initialQRString } from "@/constants/qr-string.const";

export function generateQrCodeString(
  scheduleId: number,
  sessionId: string
): string {
  return `${initialQRString}?scheduleId=${scheduleId}&sessionId=${sessionId}`;
}

export function decodeQrCodeString(qrString: string): {
  scheduleId: number;
  sessionId: string;
} {
  const urlParams = new URLSearchParams(qrString.split("?")[1]);
  const scheduleId = parseInt(urlParams.get("scheduleId") || "0", 10);
  const sessionId = urlParams.get("sessionId") || "";

  return { scheduleId, sessionId };
}

export const isValidQRString = (qrString: string): boolean => {
  return qrString.startsWith(initialQRString);
};
