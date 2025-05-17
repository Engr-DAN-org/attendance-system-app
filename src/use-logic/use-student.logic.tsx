import { AttendanceRecordQuery } from "@/interfaces/queryParams/attendanceRecordQuery";
import { AttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { getAttendanceRecordsQuery } from "@/services/attendance-record.service";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStudentLogic = () => {
  const { user } = useAuthStore((state) => state);
  const [query, setQuery] = useState<AttendanceRecordQuery>({
    page: 1,
    studentIdNumber: user.idNumber,
  });

  const {
    data: attendanceRecords,
    isPending,
    refetch: refetchRecords,
  } = useQuery<AttendanceRecord[]>({
    queryKey: ["attenance-record", query],
    queryFn: async () => await getAttendanceRecordsQuery(query),
    enabled: !!user,
  });

  return {
    attendanceRecords,
    isPending,
    refetchRecords,
    setQuery,
  };
};
