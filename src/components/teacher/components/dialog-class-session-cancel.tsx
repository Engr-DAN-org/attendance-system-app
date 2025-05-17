import { ConfirmDialog } from "@/components/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconAlertTriangle, IconCalendarCancel } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useClassSessionContext } from "../context/class-session-context";
import { cancelSessionAsync } from "@/services/class-session.service";
import { Button } from "@/components/ui/button";

interface Props {
  classSessionId: string;
}

const CancelClassSessionDialog = ({ classSessionId }: Props) => {
  const [confirmValue, setConfirmValue] = useState<string>("");
  const { dialogState, setDialogState, refectClassSession } =
    useClassSessionContext();

  const onConfirm = async () => {
    await submitForm();
    setDialogState(null);
  };

  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async () => await cancelSessionAsync(classSessionId),
      onSuccess: () => {
        refectClassSession();
        toast.success("Class session has been successfully canceled.");
      },
    });

  const isConfirmValid = confirmValue.trim().toUpperCase() === "CANCEL";

  return (
    <ConfirmDialog
      btnTrigger={
        <Button variant="outline">
          <span>Cancel Class</span> <IconCalendarCancel size={18} />
        </Button>
      }
      disabled={!isConfirmValid || isFormSubmitPending}
      handleConfirm={onConfirm}
      open={dialogState === "cancel"}
      destructive
      onOpenChange={(state) => setDialogState(state ? "cancel" : null)}
      title={
        <span className="text-destructive flex items-center gap-2">
          <IconAlertTriangle
            className="stroke-red-600 dark:stroke-red-400"
            size={20}
          />
          Cancel Class Session
        </span>
      }
      desc={
        <div className="space-y-4">
          <p>
            This will cancel the entire class session.{" "}
            <span className="text-destructive">
              This action cannot be undone.
            </span>
          </p>

          <Label className="mt-2 flex flex-row gap-2 items-center space-y-1">
            Confirmation:
            <Input
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              placeholder="Type 'CANCEL' to proceed."
            />
          </Label>

          <Alert variant="destructive" className="mt-2">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Canceling this session cannot be undone and you may need to start
              over. Proceed with caution.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isFormSubmitPending ? (
          <>
            <Loader2 className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>Confirm Cancellation</>
        )
      }
    />
  );
};

export default CancelClassSessionDialog;
