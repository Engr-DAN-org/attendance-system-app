import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AttendanceStatus } from "@/enums/attendanceStatus";

import { IconAlertTriangle, IconCalendarCheck } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useClassSessionContext } from "../context/class-session-context";
import { endSessionAsync } from "@/services/class-session.service";
import { Button } from "@/components/ui/button";

interface Props {
  classSessionId: string;
}

const EndClassSessionDialog = ({ classSessionId }: Props) => {
  const [confirmValue, setConfirmValue] = useState<string>("");
  const { dialogState, setDialogState, refectClassSession } =
    useClassSessionContext();

  const onConfirm = async () => {
    console.log("Submitting form", classSessionId);
    await submitForm();
    setDialogState(null);
  };

  // Override attendance Record
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async () => await endSessionAsync(classSessionId),
      onSuccess: () => {
        refectClassSession();

        toast.success(`Attendance record has been updated successfully!`);
      },
    });

  return (
    <ConfirmDialog
      btnTrigger={
        <Button>
          <span>End Class</span> <IconCalendarCheck size={18} />
        </Button>
      }
      disabled={isFormSubmitPending || confirmValue !== "CONFIRM"}
      handleConfirm={onConfirm}
      open={dialogState == "end"}
      onOpenChange={(state) => setDialogState(state ? "end" : null)}
      title={
        <span className="flex flex-row items-center gap-2">
          <IconAlertTriangle
            className="stroke-yellow-600 dark:stroke-yellow-400"
            size={20}
          />
          Conclude Class Session
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to conclude the class session?
            <br />
            This action will automatically mark the students who have not
            clocked in as{" "}
            <span className="font-bold">
              {AttendanceStatus.Absent.toUpperCase()}
            </span>
            {"."}
          </p>

          <Label className="mt-2 flex flex-row gap-2 items-center space-y-1">
            Confirmation:
            <Input
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              placeholder="Type 'CONFIRM' to proceed."
            />
          </Label>

          <Alert className="mt-2 border-yellow-400  text-yellow-800 dark:border-yellow-500  dark:text-yellow-200">
            <AlertTitle>Caution</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isFormSubmitPending ? (
          <>
            <Loader2 className="animate-spin" /> Submitting
          </>
        ) : (
          <>Conclude</>
        )
      }
    />
  );
};

export default EndClassSessionDialog;
