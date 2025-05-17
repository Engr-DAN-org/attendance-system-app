import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { QrCode, QrCodeIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  decodeQrCodeString,
  isValidQRString,
} from "@/utils/qr-code-string.util";
import { logAttendance } from "@/services/attendance-record.service";
import { revalidateGeoLocationPermission } from "@/utils/permission-checker.util";
import { getLocationWithCoordinates } from "@/services/navigator.service";
import { AxiosError } from "axios";
import { LogAttendanceRecord } from "@/interfaces/types/attendanceRecord";
import QRScanResultDialog from "./qr-dialogs";
import { ErrorResponseDTO } from "@/interfaces/types/responseDTO";

interface dialogProps {
  type?: "success" | "error" | "loading";
  open?: boolean;
  message: string;
  sessionId?: string;
  scheduleId?: string;
}

const initialDialogState: dialogProps = {
  type: "error",
  open: false,
  message: "",
};

export default function QRScannerPage() {
  const navigate = useNavigate();

  // variable to hold the state of the scanner
  const [paused, setPaused] = useState<boolean>(false);

  // state to hold the dialog state
  const [dialogState, setDialogState] =
    useState<dialogProps>(initialDialogState);

  // function to set the confirm handler
  const [confirmHandler, setConfirmHandler] = useState<() => void>(() =>
    setDialogState(initialDialogState)
  );

  const handleScan = useCallback(async (data: IDetectedBarcode[]) => {
    setDialogState({
      type: "loading",
      open: true,
      message: "Processing, please wait...",
    });
    try {
      setPaused(true);
      const locationGranted = await revalidateGeoLocationPermission();
      if (!locationGranted) {
        setDialogState({ message: "Please allow location access first." });
        return;
      }

      const decodedText = data?.[0]?.rawValue;

      if (!data?.[0]?.rawValue || !isValidQRString(decodedText)) {
        setDialogState({
          message: "Scanned QR code is not valid.",
          open: true,
          type: "error",
        });
        return;
      }

      console.log("Valid QR:", decodedText);
      const { sessionId } = decodeQrCodeString(decodedText);

      const locationInfo = await getLocationWithCoordinates();
      const requestData: LogAttendanceRecord = {
        classSessionId: sessionId,
        ...locationInfo,
      };
      console.log("Request Data:", requestData);

      const { classSessionId, id } = await logAttendance(requestData);

      setConfirmHandler(() => () => {
        navigate({
          to: "/student/class-schedule/$scheduleId/session/$sessionId",
          params: {
            sessionId: classSessionId,
            scheduleId: id,
          },
        });
      });
    } catch (error: unknown) {
      console.error("Error:", error);

      // Set the handler to close dialog and resume scanning
      setConfirmHandler(() => () => {
        setDialogState(initialDialogState);
        setPaused(false); // <-- resume scanner
      });

      if (error instanceof AxiosError) {
        const responseData: ErrorResponseDTO =
          error && error.response && error.response.data
            ? error.response.data
            : undefined;

        setDialogState({
          message: responseData?.message || "Something went wrong.",
          open: true,
          type: "error",
        });
      } else {
        setDialogState({
          message: "Something Went Wrong",
          open: true,
          type: "error",
        });
      }
    } finally {
      setPaused(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = useCallback((err: unknown) => {
    console.error("Scanner error:", err);
    setDialogState({
      message: "Error scanning QR code. Please try again.",
      open: true,
      type: "error",
    });
  }, []);

  return (
    <>
      <Card className="h-full w-full max-w-md shadow-lg rounded-xl border-0">
        <CardHeader className="flex items-center justify-between p-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <QrCode className="w-5 h-5 text-primary" />
            Scan Class Session QR Code
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-4 pb-6">
          <div className="aspect-square rounded-lg overflow-hidden border border-border bg-background relative">
            <Scanner
              onScan={handleScan}
              onError={handleError}
              classNames={{ container: "w-full h-full" }}
              paused={dialogState.open == true || paused}
            />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Align the QR code within the frame to scan
          </p>
        </CardContent>

        <div className="flex justify-center items-center flex-col">
          {dialogState.open != true && !paused && (
            <>
              <QrCodeIcon className="animate-pulse size-24 text-primary" />
              <span className="text-lg text-secondary text-center">
                Scanning...
              </span>
            </>
          )}
        </div>
      </Card>
      <QRScanResultDialog
        open={dialogState.open || false}
        type={dialogState.type || "error"}
        message={dialogState.message}
        onConfirm={() => confirmHandler()}
      />
    </>
  );
}
