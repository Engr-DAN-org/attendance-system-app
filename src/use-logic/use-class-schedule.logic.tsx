import { SectionQueryOption } from "@/config/useOptions/sectionQueryOptions";
import {
  ClassSchedule,
  classScheduleSchema,
} from "@/interfaces/types/classSchedule";
import {
  createAsync,
  getByTeacherOrSectionAsync,
  updateAsync,
} from "@/services/class-schedule.service";
import { toMinutes } from "@/utils/time-format.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ScheduleDialogState =
  | "add-schedule"
  | "edit-schedule"
  | "unassign-section-schedule"
  | null;

export const useClassScheduleLogic = () => {
  //used for querying class schedules by teacherId
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
  // used for querying class schedules by sectionId
  const [sectionId, setSectionId] = useState<number | undefined>(undefined);
  const [classSchedule, setClassSchedule] = useState<ClassSchedule | undefined>(
    undefined
  );
  const [scheduleDialogState, setScheduleDialogState] =
    useState<ScheduleDialogState>(null);

  // used for querying class schedules by teacherId
  const {
    data: teacherClassScheduleList,
    refetch: refetchTeacherClassSchedules,
    isPending: isFetchPending,
  } = useQuery({
    queryKey: ["teacherClassSchedule", teacherId],
    queryFn: async () =>
      getByTeacherOrSectionAsync({
        teacherId: teacherId,
      }),
    enabled: !!teacherId,
  });

  const {
    data: sectionData,
    refetch: refetchSectionData,
    isPending: isFetchingSectionData,
  } = useQuery(SectionQueryOption(sectionId || 0));

  // used for querying class schedules by sectionId
  const {
    data: sectionClassScheduleList,
    refetch: refetchSectionSchedules,
    isPending: isSectionFetchPending,
  } = useQuery({
    queryKey: ["sectionClassSchedule", sectionId],
    queryFn: async () =>
      getByTeacherOrSectionAsync({
        sectionId: sectionId,
      }),
    enabled: !!sectionId,
  });

  const scheduleForm = useForm<ClassSchedule>({
    resolver: zodResolver(classScheduleSchema),
    defaultValues: {
      id: null,
      subjectTeacherId: undefined,
      teacherId: teacherId,
      subjectName: "",
      day: "1",
      startTime: "",
      endTime: "",
      gracePeriod: 5,
    },
  });

  // ClassSchedule Create or Edit
  const { mutateAsync: submitForm, isPending: isFormSubmitPending } =
    useMutation({
      mutationFn: async (formData: ClassSchedule) => {
        console.log("Refetching class schedules...");
        await refetchSectionSchedules();
        console.log("Class schedules refetched.");
        // Before saving, validate against existing class schedules
        if (sectionClassScheduleList?.length) {
          const newStart = toMinutes(formData.startTime);
          const newEnd = toMinutes(formData.endTime);

          const hasConflict = sectionClassScheduleList.some((existing) => {
            if (existing.id == formData.id) return false; // Skip self when editing
            if (existing.day != formData.day) return false; // Different day

            const existStart = toMinutes(existing.startTime);
            const existEnd = toMinutes(existing.endTime);

            return newStart < existEnd && existStart < newEnd; // Overlapping
          });

          if (hasConflict) {
            scheduleForm.setError("isBreak", {
              type: "manual",
              message: "Schedule conflict detected with existing schedules.",
            });
            scheduleForm.setError("startTime", {
              type: "setValueAs",
              message: "",
            });
            scheduleForm.setError("endTime", {
              type: "setValueAs",
              message: "",
            });

            return Promise.reject({ message: "Schedule conflict detected." });
          }
        }

        return formData.id
          ? await updateAsync(formData.id, formData)
          : await createAsync(formData);
      },
      onSuccess: async () => {
        if (teacherId) {
          await refetchTeacherClassSchedules();
        }
        if (sectionId) {
          await refetchSectionSchedules();
        }
        toast.success("Class schedule has been set!");
        setScheduleDialogState(null);
        scheduleForm.reset();
      },
      onError: (error) => {
        console.log("Error creating/updating class schedule:", error);
        toast.error(error.message || "Something went wrong _.");
      },
    });

  return {
    scheduleDialogState,
    setScheduleDialogState,
    classSchedule,
    setClassSchedule,
    scheduleForm,
    submitForm,
    isFormSubmitPending,
    teacherId,
    setTeacherId,
    teacherClassScheduleList,
    refetchTeacherClassSchedules,
    isFetchPending,
    sectionId,
    setSectionId,
    sectionClassScheduleList,
    refetchSectionSchedules,
    isSectionFetchPending,
    // used for section Data Query
    sectionData,
    refetchSectionData,
    isFetchingSectionData,
  };
};
