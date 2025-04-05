import { UserRoleType } from "@/enums/userRole";
import { GetGuardianDTO } from "./guardian";
import { UserStatus } from "@/enums/userStatus";

interface GetProfileDTO {
  idNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  status: UserStatus;
  sectionId?: number | null;
  // section?: Section | null;
  guardianId?: number | null;
  guardian?: GetGuardianDTO | null;
  // attendanceRecords?: AttendanceRecord[] | null;
  // classSchedules?: ClassSchedule[] | null;

  // classSessions?: ClassSession[] | null;
  role: UserRoleType;
}

interface SidebarHeaderProfile {
  nameOrTitle: string;
  roleOrDescription: string;
  icon: React.ElementType;
}

interface UserProfile {
  name: string;
  email: string;
  icon: React.ElementType;
}

export type { SidebarHeaderProfile, GetProfileDTO, UserProfile };
