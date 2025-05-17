import { AttendanceStatus } from "@/enums/attendanceStatus";
import { BaseQueryParam } from "./baseQueryParam";

export interface AttendanceRecordQuery extends BaseQueryParam {
  classSessionId?: string;
  classScheduleId?: number;
  studentIdNumber?: string;
  status?: AttendanceStatus[];
  paginate?: boolean;
}
