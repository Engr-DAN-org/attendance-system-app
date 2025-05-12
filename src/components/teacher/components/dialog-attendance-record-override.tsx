import { FormSelectField } from "@/components/form-components/form-select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AttendanceStatus,
  AttendanceStatusOptions,
} from "@/enums/attendanceStatus";
import {
  AttendanceRecord,
  OverrideAttendanceRecord,
  overrideAttendanceRecordSchema,
} from "@/interfaces/types/attendanceRecord";
import { overrideAttendanceRecordAsync } from "@/services/teacher.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useClassSessionContext } from "../context/class-session-context";

interface Props {
  currentRow: AttendanceRecord;
}

const AttendanceRecordOverrideDialog = ({ currentRow }: Props) => {
  const { dialogState, setDialogState } = useClassSessionContext();

  const form = useForm<OverrideAttendanceRecord>({
    resolver: zodResolver(overrideAttendanceRecordSchema),
    defaultValues: {
      attendanceRecordId: currentRow.id,
      status:
        currentRow.status != AttendanceStatus.Unmarked
          ? currentRow.status
          : undefined,
    },
  });

  const onSubmit = async (values: OverrideAttendanceRecord) => {
    console.log("Submitting form", values);
    await submitForm(values);
  };

  // Override attendance Record
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (data: OverrideAttendanceRecord) =>
        await overrideAttendanceRecordAsync(data),
      onSuccess: () => {
        setDialogState(null);
        form.reset();
        toast.success(`Attendance record has been updated successfully!`);
      },
    });

  return (
    <Dialog
      open={dialogState === "override"}
      onOpenChange={(state) => {
        form.reset();
        setDialogState(state ? "override" : null);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <IconAlertTriangle
              className="stroke-yellow-600 dark:stroke-yellow-400"
              size={20}
            />
            Override Attendance Record
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="-mr-4 w-full py-1 pr-4">
          <Form {...form}>
            <form
              id="override-attendance-form"
              onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
              className="space-y-4 mt-4"
            >
              <div className="space-y-1 flex flex-row items-center gap-2 mt-2 ">
                <Label htmlFor="status" className="text-nowrap">
                  Attendance Status:
                </Label>
                <FormSelectField<typeof overrideAttendanceRecordSchema>
                  form={form}
                  className="w-full space-y-0"
                  name="status"
                  options={AttendanceStatusOptions.filter(
                    ({ value }) => value != AttendanceStatus.Unmarked
                  )}
                />
              </div>

              <Alert className="mt-2 border-yellow-400  text-yellow-800 dark:border-yellow-500  dark:text-yellow-200">
                <AlertTitle className="font-semibold">Caution</AlertTitle>
                <AlertDescription>
                  {`You're overriding ${currentRow.student.fullName}'s attendance status.`}
                  <br />
                  Please make sure the new status is correct.
                </AlertDescription>
              </Alert>

              <DialogFooter className="mt-6">
                <Button
                  type="submit"
                  disabled={isFormSubmitPending}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black"
                >
                  {isFormSubmitPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Confirm Override <Save className="ml-2" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceRecordOverrideDialog;
