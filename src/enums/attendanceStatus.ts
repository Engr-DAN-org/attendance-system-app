import { z } from "zod";

export enum AttendanceStatus {
  Present = "Present",
  Late = "Late",
  Absent = "Absent",
}

export const attendanceStatus = z.nativeEnum(AttendanceStatus);
export type AttendanceStatusType = z.infer<typeof attendanceStatus>;

export const AttendanceStatusOptions: {
  value: AttendanceStatusType;
  label: string;
}[] = Object.values(AttendanceStatus).map((value) => ({
  value,
  label: value,
}));

export type AttendanceStatusOption = (typeof AttendanceStatusOptions)[number];
export type AttendanceStatusOptionValue = AttendanceStatusOption["value"];
export type AttendanceStatusOptionLabel = AttendanceStatusOption["label"];

export const attendanceStatusCallTypes = new Map<AttendanceStatus, string>([
  [
    AttendanceStatus.Present,
    "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200",
  ],
  [AttendanceStatus.Late, "bg-neutral-300/40 border-neutral-300"],
  [
    AttendanceStatus.Absent,
    "bg-red-100/30 text-red-900 dark:text-red-200 border-red-200",
  ],
]);
