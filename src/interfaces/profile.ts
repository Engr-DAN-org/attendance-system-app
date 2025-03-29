import { GetGuardianDTO } from "./guardian";

export interface GetProfileDTO {
  idNumber: string;
  firstName: string;
  lastName: string;
  sectionId?: number | null;
  // section?: Section | null;
  guardianId?: number | null;
  guardian?: GetGuardianDTO | null;
  // attendanceRecords?: AttendanceRecord[] | null;
  // classSchedules?: ClassSchedule[] | null;

  // classSessions?: ClassSession[] | null;
  fullName: string;
  role: string;
}
