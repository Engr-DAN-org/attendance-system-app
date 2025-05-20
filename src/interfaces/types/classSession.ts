import { classSessionStatus } from "@/enums/classSessionStatus";
import { z } from "zod";

// Regex for HH:mm or HH:mm:ss (24-hour format)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

export const ClassSessionFormSchema = z.object({
  classScheduleId: z.number(),
  startTime: z.string().regex(timeRegex, "Invalid time format").optional(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  graceTime: z.string().regex(timeRegex, "Invalid time format").optional(),
});

export const ClassSessionShema = ClassSessionFormSchema.extend({
  id: z.string(),
  endTime: z.string().regex(timeRegex, "Invalid time format").optional(),
  attendanceRecords: z.array(z.any()), // will finalize later
  createdAt: z.string().datetime(),
  status: classSessionStatus,
  classSchedule: z.any().optional(),
  isRemote: z.boolean(),
});

export type ClassSessionFormType = z.infer<typeof ClassSessionFormSchema>;
export type ClassSession = z.infer<typeof ClassSessionShema>;
