import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useSubjectContext } from "../context/subject-context";

export function SubjectDeleteDialog() {
  const { submitDelete, isDeletePending, subjectToDelete, setSubjectToDelete } =
    useSubjectContext();
  const [value, setValue] = useState("");

  const handleConfirmDelete = async () => {
    if (subjectToDelete == undefined || value != subjectToDelete.code) return;
    if (subjectToDelete.id) {
      await submitDelete(subjectToDelete.id);
    } else {
      console.error("Subject ID is undefined. Cannot delete subject.");
      return;
    }
    setSubjectToDelete(undefined);
  };

  return (
    <ConfirmDialog
      open={subjectToDelete != undefined}
      isLoading={isDeletePending}
      onOpenChange={() => setSubjectToDelete(undefined)}
      handleConfirm={handleConfirmDelete}
      disabled={value !== subjectToDelete?.code}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete Subject
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{subjectToDelete?.code}</span>?
            <br />
            This action will permanently remove the subject:{" "}
            <span className="font-bold">
              {subjectToDelete?.name.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="mt-2">
            Subject Code:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the Subject's Code to confirm deletion."
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
