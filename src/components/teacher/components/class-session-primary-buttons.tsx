import EndClassSessionDialog from "./dialog-class-session-end";
import CancelClassSessionDialog from "./dialog-class-session-cancel";
import { ClassSessionStatus } from "@/enums/classSessionStatus";
import { useClassSessionContext } from "../context/class-session-context";

export function ClassSessionPrimaryButtons() {
  const { classSession } = useClassSessionContext();
  return (
    <>
      {classSession &&
        classSession.status == ClassSessionStatus.Started.toString() && (
          <div className="flex gap-2">
            <CancelClassSessionDialog classSessionId={classSession.id} />
            <EndClassSessionDialog classSessionId={classSession.id} />
          </div>
        )}
    </>
  );
}
