import { DayOfWeekSchema } from "@/enums/dayOfWeek";
import { z } from "zod";

export type ClassSchedule = z.infer<typeof classScheduleSchema>;

export const baseClassScheduleSchema = z.object({
  index: z.any().optional(), // for local handling
  id: z.any().optional().nullable(),
  subjectTeacherId: z.number().min(1, "Subject is required"),
  subjectName: z.string().optional(),
  subjectCode: z.string().optional(),
  teacherName: z.string().optional(),
  teacherId: z.string().optional(),
  day: DayOfWeekSchema.describe("Day"),
  startTime: z.string().min(1, "Start time is required"), // Format: "HH:mm"
  endTime: z.string().min(1, "End time is required"), // Format: "HH:mm"
  gracePeriod: z.any().default("5"),
  isBreak: z.boolean().optional(),
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

export const classSchedulesSchema = z
  .array(classScheduleSchema)
  .min(1, "At least one class schedule is required")
  .refine(
    (schedules) => {
      const toMinutes = (time: string) => {
        const [hour, min] = time.split(":").map(Number);
        return hour * 60 + min;
      };

      for (let i = 0; i < schedules.length; i++) {
        for (let j = i + 1; j < schedules.length; j++) {
          const a = schedules[i];
          const b = schedules[j];

          if (a.day !== b.day) continue;

          const startA = toMinutes(a.startTime);
          const endA = toMinutes(a.endTime);
          const startB = toMinutes(b.startTime);
          const endB = toMinutes(b.endTime);

          const isOverlap = startA < endB && startB < endA;
          if (isOverlap) return false;
        }
      }

      return true;
    },
    {
      message: "Class schedules should not conflict with each other.",
    }
  );
