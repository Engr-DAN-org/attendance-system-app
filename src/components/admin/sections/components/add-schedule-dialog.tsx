import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSectionCreationContext } from "../context/create-section-context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ClassSchedule,
  classScheduleSchema,
} from "@/interfaces/types/classSchedule";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { daysOptions } from "@/enums/dayOfWeek";

export const AddScheduleDialog = () => {
  const { append, setOpenScheduleDialog, openScheduleDialog } =
    useSectionCreationContext();

  const scheduleForm = useForm<ClassSchedule>({
    resolver: zodResolver(classScheduleSchema),
    defaultValues: {
      subjectId: undefined,
      day: undefined,
      startTime: undefined,
      endTime: undefined,
      gracePeriod: 5,
    },
  });

  const handleAdd = (data: ClassSchedule) => {
    append(data);
    setOpenScheduleDialog(false);
  };
  return (
    <Dialog
      modal={true}
      open={openScheduleDialog}
      onOpenChange={(state) => {
        scheduleForm.reset();
        setOpenScheduleDialog(state);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class Schedule</DialogTitle>
        </DialogHeader>

        <Form {...scheduleForm}>
          <form
            onSubmit={scheduleForm.handleSubmit(handleAdd)}
            className="space-y-4"
          >
            <FormField
              control={scheduleForm.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                      <Input type="time" {...field} />
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
                      <Input type="time" {...field} />
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

            <DialogFooter>
              <Button type="submit">Add Schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
