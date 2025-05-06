import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSectionCreationContext } from "../context/create-section-context";

import {
  ClassSchedule,
  ClassScheduleQueryForm,
  classScheduleQuerySchema,
} from "@/interfaces/types/classSchedule";
import { DayOfWeekMap, daysOptions } from "@/enums/dayOfWeek";
import { stepMinutes } from "@/constants/section.constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "@/components/form-components/form-input";
import { Form } from "@/components/ui/form";
import { FormSelectField } from "@/components/form-components/form-select";
import { SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { queryAsync } from "@/services/class-schedule.service";
import { IconLoader2 } from "@tabler/icons-react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useParams } from "@tanstack/react-router";
import { useClassScheduleContext } from "../../class-schedule/class-schedule-context";
import { cn } from "@/lib/utils";

const inintialState: ClassScheduleQueryForm = {
  unassigned: true,
  subjectName: "",
  teacherName: "",
  day: "1",
  startTime: "",
  endTime: "",
};

export const AddScheduleDialog = () => {
  //params
  const { id: sectionId } = useParams({
    from: "/_authenticated/admin/sections/$id/",
  });

  // States
  const [selectedSchedule, setSelectedSchedule] = useState<
    ClassSchedule | undefined
  >(undefined);
  const [searchData, setSearchData] =
    useState<ClassScheduleQueryForm>(inintialState);

  const [error, setError] = useState<string | null>(null);

  // Context
  const { setOpenScheduleDialog, openScheduleDialog } =
    useSectionCreationContext();

  const {
    submitForm: submitScheduleUpdate,
    isFormSubmitPending: isScheduleUpdatePending,
  } = useClassScheduleContext();

  //React Form
  const scheduleQueryForm = useForm<ClassScheduleQueryForm>({
    resolver: zodResolver(classScheduleQuerySchema),
    defaultValues: inintialState,
  });

  //React Query
  const { data: queriedList, isPending } = useQuery<ClassSchedule[]>({
    queryKey: ["subject-teachers", searchData],
    queryFn: () => queryAsync(searchData),
    enabled: !!openScheduleDialog,
  });

  const handleSearch = (formData: ClassScheduleQueryForm) => {
    setSearchData(formData);
  };

  const handleAdd = async () => {
    if (!selectedSchedule) {
      setError("Please select a subject and teacher before proceeding.");
      return;
    }
    try {
      setError(null);
      console.log(selectedSchedule);
      await submitScheduleUpdate(selectedSchedule);
    } catch (error) {
      console.error("Error fetching teacher subject:", error);
    }
  };

  return (
    <Dialog
      modal={true}
      open={openScheduleDialog}
      onOpenChange={(state) => {
        setOpenScheduleDialog(state);
        setError("");
        setSelectedSchedule(undefined);
        scheduleQueryForm.reset();
        // setSelectedScheduleId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusIcon /> Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Class Schedule</DialogTitle>
          <DialogDescription>
            Find and select a class schedule. Use search to filter easily.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <Form {...scheduleQueryForm}>
            <form onSubmit={scheduleQueryForm.handleSubmit(handleSearch)}>
              <div className="grid grid-cols-4 lg:grid-cols-12 gap-2 lg:gap-4 space-y-4">
                <FormInputField<typeof classScheduleQuerySchema>
                  className="col-span-2 lg:col-span-3"
                  form={scheduleQueryForm}
                  name="subjectName"
                  label="Subject Name / Code"
                  placeholder="Search Subject..."
                />
                <FormInputField<typeof classScheduleQuerySchema>
                  className="lg:col-span-2 col-span-2"
                  form={scheduleQueryForm}
                  name="teacherName"
                  label="Teacher"
                  placeholder="Teacher Name"
                />
                <FormSelectField<typeof classScheduleQuerySchema>
                  className="lg:col-span-2"
                  form={scheduleQueryForm}
                  name="day"
                  label="Day"
                  placeholder="Select Day"
                  options={daysOptions}
                />
                <FormInputField<typeof classScheduleQuerySchema>
                  className="lg:col-span-2"
                  form={scheduleQueryForm}
                  name="startTime"
                  type="time"
                  step={stepMinutes}
                  label="Start Time"
                />
                <FormInputField<typeof classScheduleQuerySchema>
                  className="lg:col-span-2"
                  form={scheduleQueryForm}
                  name="endTime"
                  type="time"
                  step={stepMinutes}
                  label="End Time"
                />
                <div className="h-full flex items-center justify-end">
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <IconLoader2 className="animate-spin" />
                    ) : (
                      <SearchIcon />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
          <div className="border rounded-md overflow-auto max-h-[400px] col-span-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queriedList && queriedList.length > 0 ? (
                  queriedList.map((sched) => (
                    <TableRow key={sched.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSchedule?.id == sched.id}
                          onCheckedChange={() => {
                            setSelectedSchedule({
                              ...sched,
                              sectionId: Number(sectionId),
                            });
                            if (selectedSchedule?.id == sched.id) {
                              console.log(sched);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="text-nowrap text-ellipsis">
                        <span>{sched.subjectCode}</span>{" "}
                        {sched.subjectCode && sched.subjectName && "--"}
                        <span>{sched.subjectName}</span>
                      </TableCell>
                      <TableCell>{sched.teacherName}</TableCell>
                      <TableCell>
                        {DayOfWeekMap[sched.day].name || ""}
                      </TableCell>
                      <TableCell>{sched.startTime}</TableCell>
                      <TableCell>{sched.endTime}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No schedules found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="">
          {error && (
            <div className="text-sm text-destructive text-right pb-2">
              <span>{error}</span>
            </div>
          )}

          <DialogFooter className="justify-end">
            <Button
              onClick={() => handleAdd()}
              disabled={isScheduleUpdatePending}
            >
              <IconLoader2
                className={cn(
                  isScheduleUpdatePending ? "animate-spin" : "hidden"
                )}
              />
              Add Schedule
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
