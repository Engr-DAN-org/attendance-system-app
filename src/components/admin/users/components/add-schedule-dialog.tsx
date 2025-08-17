import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  baseClassScheduleSchema,
  ClassSchedule,
} from "@/interfaces/types/classSchedule";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { daysOptions } from "@/enums/dayOfWeek";
import {
  FormComboField,
  OptionType,
} from "@/components/form-components/form-command";
import { stepMinutes } from "@/constants/section.constants";
import { useEffect, useState } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2, PlusIcon } from "lucide-react";
import { useClassScheduleContext } from "../../class-schedule/class-schedule-context";
import { useSelectDataContext } from "@/context/select-data-context";

export const AddScheduleDialog = () => {
  const {
    submitForm,
    isFormSubmitPending,
    scheduleDialogState,
    setScheduleDialogState,
    scheduleForm,
    teacherId,
  } = useClassScheduleContext();
  const {
    setSubjectTeacherQuery,
    subjectTeacherQueryData,
    isSubjectTeacherQueryPending,
  } = useSelectDataContext();
  const [subjectOptions, setSubjectOptiions] = useState<OptionType[]>([]);

  // Updates the options on load
  useEffect(() => {
    if (!teacherId) return;

    setSubjectTeacherQuery({ teacherId: teacherId });

    const updatedOptions: OptionType[] =
      subjectTeacherQueryData?.map((st) => ({
        label: `${st.subjectCode} -- ${st.subjectName}`,
        value: st.id as number,
      })) || [];

    setSubjectOptiions(updatedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  // Updates the options on search
  const filterSubjects = (value: string) => {
    console.log("teacherID:", teacherId);

    value = value.toLowerCase();

    const updatedOptions =
      subjectTeacherQueryData
        ?.filter(
          (st) =>
            st.subjectCode?.toLowerCase().includes(value) ||
            st.subjectName?.toLowerCase().includes(value)
        )
        .map((st) => ({
          label: `${st.subjectCode} -- ${st.subjectName}`,
          value: st.id as number,
        })) || [];

    setSubjectOptiions(updatedOptions);
  };

  const handleAdd = async (formData: ClassSchedule) => {
    try {
      console.log(formData);
      await submitForm(formData);
    } catch (error) {
      console.error("Error fetching teacher subject:", error);
    }
  };

  return (
    <Dialog
      modal={true}
      open={scheduleDialogState == "add-schedule"}
      onOpenChange={(state) => {
        setScheduleDialogState(state ? "add-schedule" : null);
        scheduleForm.reset(); // reset only when closing
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setScheduleDialogState("add-schedule");
            console.log(scheduleDialogState);
          }}
        >
          <PlusIcon /> Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class Schedule</DialogTitle>
        </DialogHeader>

        <Form {...scheduleForm}>
          <form
            onSubmit={scheduleForm.handleSubmit(handleAdd)}
            className="space-y-4"
          >
            <FormComboField<typeof baseClassScheduleSchema>
              form={scheduleForm}
              name="subjectTeacherId"
              label="Subject"
              options={subjectOptions}
              onSearch={filterSubjects}
              isLoading={isSubjectTeacherQueryPending}
            />

            <FormField
              control={scheduleForm.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {daysOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value.toString()}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={scheduleForm.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" step={stepMinutes * 60} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={scheduleForm.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" step={stepMinutes * 60} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={scheduleForm.control}
              name="gracePeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grace Period (mins)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {scheduleForm.formState.errors?.isBreak && (
              <div className="flex items-center space-x-2 text-destructive text-sm font-semibold justify-end">
                <span className="text-destructive text-sm font-semibold">
                  {scheduleForm.formState.errors.isBreak?.message}
                </span>
              </div>
            )}

            <DialogFooter className="flex justify-between items-center">
              <Button disabled={isFormSubmitPending} type="submit">
                {isFormSubmitPending && <Loader2 className=" animate-spin" />}
                Add Schedule
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
