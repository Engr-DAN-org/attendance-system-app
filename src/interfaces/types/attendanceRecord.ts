import { z } from "zod";
import { userSchema } from "./user";
import { attendanceStatus } from "@/enums/attendanceStatus";
import { ClassSessionShema } from "./classSession";

export const attendanceRecordSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  classSessionId: z.string(),
  classSession: ClassSessionShema.optional(),
  status: attendanceStatus,
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  distance: z.number().optional(),
  student: userSchema,
  studentName: z.string(),
  clockInRecord: z.string().optional(),
  createdAt: z.string().optional(),
});

export const overrideAttendanceRecordSchema = z.object({
  attendanceRecordId: z.string(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  distance: z.number().optional(),
  status: attendanceStatus,
});

export const logAttendanceRecordSchema = z.object({
  classSessionId: z.string().min(1),
  location: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  distance: z.number().nullable().optional(),
});

export interface LogAttendanceRecordDTO {
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  distance: number | null;
}

export type LogAttendanceRecord = z.infer<typeof logAttendanceRecordSchema>;
export type OverrideAttendanceRecord = z.infer<
  typeof overrideAttendanceRecordSchema
>;

export type AttendanceRecord = z.infer<typeof attendanceRecordSchema>;
