import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import {
  ClassSession,
  ClassSessionFormSchema,
  ClassSessionFormType,
} from "@/interfaces/types/classSession";
import {
  getByIdAsync,
  // getListByScheduleIdAsync,
} from "@/services/class-session.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type ClassSessionDialogState = "override" | "end" | "cancel";

export const useClassSessionLogic = () => {
  const [dialogState, setDialogState] =
    useState<ClassSessionDialogState | null>(null);

  //selected attendance record
  const [attendanceRecord, setAttendanceRecord] =
    useState<AttendanceRecord | null>(null);

  // selected class session ID
  const [classSessionId, setClassSessionId] = useState<string | null>(null);

  const classSessionForm = useForm<ClassSessionFormType>({
    resolver: zodResolver(ClassSessionFormSchema),
    defaultValues: {},
  });

  // class session data including attendance record list
  const {
    data: classSession,
    isPending: isSessionQueryPending,
    refetch: refectClassSession,
  } = useQuery<ClassSession>({
    queryKey: ["class-session", classSessionId],
    queryFn: async () => {
      if (!classSessionId) {
        throw new Error("classSessionId is not defined");
      }
      return await getByIdAsync(classSessionId);
    },
    enabled: !!classSessionId,
  });

  // const {data:classSessionList, isPending:isClassSessionListQueryPending} = useQuery<ClassSession[]>({
  //   queryKey: ["class-session-list"],
  //   queryFn: async () => {
  //     return await getListByScheduleIdAsync(classSessionId);
  //   },
  //   enabled: !!classSessionId,
  // });

  return {
    classSessionForm,
    dialogState,
    setDialogState,
    attendanceRecord,
    setAttendanceRecord,
    classSession,
    isSessionQueryPending,
    setClassSessionId,
    refectClassSession,
  };
};
