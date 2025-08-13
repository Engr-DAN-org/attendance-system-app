import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useCourseContext } from "../context/course-context";

export function CoursesDeleteDialog() {
  const {
    handleDelete,
    editCourse,
    isDeletePending,
    dialogState,
    setDialogState,
    setEditCourse,
  } = useCourseContext();
  const [value, setValue] = useState("");

  const handleConfirmDelete = async () => {
    if (value.trim() !== editCourse?.code) return;
    await handleDelete(editCourse.id);
  };

  return (
    <ConfirmDialog
      open={dialogState == "delete"}
      isLoading={isDeletePending}
      onOpenChange={(state) => {
        setDialogState(state ? "delete" : "");
        if (!state) {
          setEditCourse(null);
          setValue(""); // Reset value when dialog is closed
        }
      }}
      handleConfirm={handleConfirmDelete}
      disabled={value.trim() !== editCourse?.code}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />
          Delete Course
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete the course{" "}
            <span className="font-bold">{editCourse?.code}</span>?
            <br />
            This action will permanently remove the course{" "}
            <span className="font-bold">{editCourse?.name}</span> from the
            system. This cannot be undone.
          </p>

          <Label className="mt-2">
            Course Code:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the Course Code to confirm deletion."
            />
          </Label>

          <Alert variant="destructive" className="mt-2">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
