import EndClassSessionDialog from "./dialog-class-session-end";
import CancelClassSessionDialog from "./dialog-class-session-cancel";
import { ClassSessionStatus } from "@/enums/classSessionStatus";
import { ClassSession } from "@/interfaces/types/classSession";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { openQrCodeTab } from "@/utils/qr-tab-generator.util";

export function ClassSessionPrimaryButtons({
  classSession,
}: {
  classSession?: ClassSession;
}) {
  return (
    <>
      {classSession &&
        classSession.status == ClassSessionStatus.Started.toString() && (
          <div className="flex gap-2">
            <Button onClick={async () => await openQrCodeTab(classSession)}>
              <QrCode /> View QR Code
            </Button>
            <CancelClassSessionDialog classSessionId={classSession.id} />
            <EndClassSessionDialog classSessionId={classSession.id} />
          </div>
        )}
    </>
  );
}
