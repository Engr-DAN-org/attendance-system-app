import { AttendanceRecordQueryParams } from "@/interfaces/queryParams/attendanceRecordQuery";
import {
  AttendanceRecord,
  LogAttendanceRecord,
} from "@/interfaces/types/attendanceRecord";
import api from "@/lib/axiosSetup";

const logAttendance = async (
  formData: LogAttendanceRecord
): Promise<AttendanceRecord> => {
  const response = await api.post("attendanceRecord/log", formData);

  return response.data;
};

const getAttendanceRecordsQuery = async (
  params: AttendanceRecordQueryParams
): Promise<AttendanceRecord[]> => {
  const response = await api.get("attendanceRecord", {
    params,
  });

  return response.data;
};

const getStudentRecordHistory = async (
  queryParams: AttendanceRecordQueryParams
) => {
  const response = await api.get("attendanceRecord/student-history", {
    params: queryParams,
  });

  return response.data;
};

const getRecordBySessionId = async (
  sessionId: string
): Promise<AttendanceRecord> => {
  const response = await api.get(`classSession/${sessionId}/attendance-record`);

  return response.data;
};

export {
  logAttendance,
  getAttendanceRecordsQuery,
  getRecordBySessionId,
  getStudentRecordHistory,
};
