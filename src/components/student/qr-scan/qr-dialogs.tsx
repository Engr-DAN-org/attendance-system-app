import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface QRScanResultDialogProps {
  open: boolean;
  type: "success" | "error" | "loading";
  message: string;
  onConfirm: () => void;
}

export default function QRScanResultDialog({
  open,
  type,
  message,
  onConfirm,
}: QRScanResultDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {type === "loading" ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <Loader2 className="animate-spin h-10 w-10 text-primary" />
                <p className="text-sm text-muted-foreground">{message}</p>
              </div>
            ) : (
              message
            )}
          </AlertDialogTitle>
        </AlertDialogHeader>
        {type !== "loading" && (
          <AlertDialogFooter>
            <AlertDialogAction onClick={onConfirm}>
              {type === "success" ? "Confirm" : "Try Again"}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
