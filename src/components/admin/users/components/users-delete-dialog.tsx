import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { User } from "@/interfaces/types/user";
import { useUserQueryContext } from "../context/users-context";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { handleDelete, isDeletePending } = useUserQueryContext();
  const [value, setValue] = useState("");

  const handleConfirmDelete = async () => {
    if (value.trim() !== currentRow.idNumber) return;
    if (currentRow.id) {
      await handleDelete(currentRow.id);
    } else {
      console.error("User ID is undefined. Cannot delete user.");
    }
    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      isLoading={isDeletePending}
      onOpenChange={onOpenChange}
      handleConfirm={handleConfirmDelete}
      disabled={value.trim() !== currentRow.idNumber}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentRow.idNumber}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className="font-bold">
              {currentRow.role.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="mt-2">
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the User's ID Number to confirm deletion."
            />
          </Label>

          <Alert variant="destructive" className="mt-2">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
