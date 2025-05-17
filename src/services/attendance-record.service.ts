import { AttendanceRecordQuery } from "@/interfaces/queryParams/attendanceRecordQuery";
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

const getAttendanceRecordsQuery = async (params: AttendanceRecordQuery) => {
  const response = await api.get("attendanceRecord", {
    params,
  });

  return response.data;
};

const getRecordBySessionId = async (sessionId: string) => {
  const response = await api.get(`classSession/${sessionId}/attendance-record`);

  return response.data;
};

export { logAttendance, getAttendanceRecordsQuery, getRecordBySessionId };
