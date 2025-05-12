import { initialQRString } from "@/constants/qr-string.const";

export function generateQrCodeString(
  scheduleId: number,
  sessionId: string
): string {
  return `${initialQRString}?scheduleId=${scheduleId}&sessionId=${sessionId}`;
}
