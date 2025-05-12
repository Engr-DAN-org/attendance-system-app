import { z } from "zod";
import { userSchema } from "./user";
import { attendanceStatus } from "@/enums/attendanceStatus";

export const attendanceRecordSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  classSessionId: z.string(),
  status: attendanceStatus,
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  distance: z.number().optional(),
  student: userSchema,
  studentName: z.string(),
  timeIn: z.date().optional(),
});

export const overrideAttendanceRecordSchema = z.object({
  attendanceRecordId: z.string(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  distance: z.number().optional(),
  status: attendanceStatus,
});

export type OverrideAttendanceRecord = z.infer<
  typeof overrideAttendanceRecordSchema
>;

export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;
