import { DayOfWeekSchema } from "@/enums/dayOfWeek";
import { z } from "zod";
import { ClassSessionShema } from "./classSession";

export const classScheduleQuerySchema = z.object({
  unassigned: z.boolean().optional(),
  subjectName: z.string().optional(),
  teacherName: z.string().optional(),
  day: DayOfWeekSchema.optional().describe("Day"),
  startTime: z.string().optional(), // Format: "HH:mm"
  endTime: z.string().optional(), // Format: "HH:mm"
});

export const baseClassScheduleSchema = z.object({
  index: z.any().optional(), // for local handling
  id: z.any().optional().nullable(),
  sectionId: z.number().optional().nullable(),
  subjectTeacherId: z.number().min(1, "Subject is required"),
  subjectName: z.string().optional(),
  subjectCode: z.string().optional(),
  teacherName: z.string().optional(),
  teacherId: z.string().optional(),
  day: DayOfWeekSchema.describe("Day"),
  dayName: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"), // Format: "HH:mm"
  endTime: z.string().min(1, "End time is required"), // Format: "HH:mm"
  gracePeriod: z.any().default("5"),
  isBreak: z.boolean().optional(),
  classSessions: z.array(ClassSessionShema).optional(),
});

export const classScheduleSchema = baseClassScheduleSchema
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      return ![startHour, startMin, endHour, endMin].some(isNaN);
    },
    {
      message: "Invalid time format",
      path: ["startTime"], // could apply to both start and end time if needed
    }
  )
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      const startTotal = startHour * 60 + startMin;
      const endTotal = endHour * 60 + endMin;

      return endTotal > startTotal;
    },
    {
      message: "End time must be later than start time",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      const startTotal = startHour * 60 + startMin;
      const endTotal = endHour * 60 + endMin;

      return startTotal >= 360 && endTotal <= 1140; // 6:00AM to 7:00PM in minutes
    },
    {
      message: "Class time must be between 6:00AM and 7:00PM",
      path: ["startTime"],
    }
  )
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      const startTotal = startHour * 60 + startMin;
      const endTotal = endHour * 60 + endMin;

      const lunchStart = 721;
      const lunchEnd = 779;

      return !(
        (startTotal >= lunchStart && startTotal <= lunchEnd) ||
        (endTotal >= lunchStart && endTotal <= lunchEnd) ||
        (startTotal < lunchStart && endTotal > lunchEnd)
      );
    },
    {
      message: "Class schedule can't overlap with lunch break",
      path: ["startTime"],
    }
  );

export const classSchedulesSchema = z.array(classScheduleSchema);

export type ClassScheduleQueryForm = z.infer<typeof classScheduleQuerySchema>;
export type ClassSchedule = z.infer<typeof classScheduleSchema>;
export type ClassSchedules = z.infer<typeof classSchedulesSchema>;
