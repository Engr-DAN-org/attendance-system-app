import { AttendanceStatus } from "@/enums/attendanceStatus";
import { AttendanceRecordQueryParams } from "@/interfaces/queryParams/attendanceRecordQuery";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import {
  getAttendanceRecordsQuery,
  getStudentRecordHistory,
} from "@/services/attendance-record.service";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStudentLogic = () => {
  const { user } = useAuthStore((state) => state);
  const [query, setQuery] = useState<AttendanceRecordQueryParams>({
    page: 1,
    studentIdNumber: user.idNumber,
  });

  const [recordsQuery, setRecordsQuery] = useState<AttendanceRecordQueryParams>(
    {
      page: 1,
      classSessionId: "",
      studentIdNumber: user.idNumber,
      status: [
        AttendanceStatus.Absent,
        AttendanceStatus.Present,
        AttendanceStatus.Excused,
        AttendanceStatus.Late,
      ],
    }
  );

  const {
    data: attendanceRecords,
    isPending,
    refetch: refetchRecords,
  } = useQuery<AttendanceRecord[]>({
    queryKey: ["attenance-record", query],
    queryFn: async () => await getAttendanceRecordsQuery(query),
    enabled: !!user,
  });

  const {
    data: attendanceHistory,
    isPending: isAttendanceHistoryPending,
    refetch: refetchAttendanceHistory,
  } = useQuery<AttendanceRecord[]>({
    queryKey: ["attenance-record-history", recordsQuery],
    queryFn: async () => await getStudentRecordHistory(recordsQuery),
    enabled: !!user,
  });

  return {
    attendanceRecords,
    isPending,
    refetchRecords,
    setQuery,
    // for attendance records history
    attendanceHistory,
    isAttendanceHistoryPending,
    refetchAttendanceHistory,
    setRecordsQuery,
  };
};
