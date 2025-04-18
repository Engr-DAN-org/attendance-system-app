import { DayOfWeekSchema } from "@/enums/dayOfWeek";
import { z } from "zod";

export type ClassSchedule = z.infer<typeof classScheduleSchema>;

export const classScheduleSchema = z
  .object({
    id: z.number().optional().nullable(),
    subjectId: z.number().min(1, "Subject is required"),
    subjectName: z.string().optional(),
    teacherId: z.string().optional(),
    day: DayOfWeekSchema.describe("Day"),
    startTime: z.string().min(1, "Start time is required"), // Format: "HH:mm"
    endTime: z.string().min(1, "End time is required"), // Format: "HH:mm"
    gracePeriod: z.number().min(0).default(5),
    isBreak: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      if (
        isNaN(startHour) ||
        isNaN(startMin) ||
        isNaN(endHour) ||
        isNaN(endMin)
      ) {
        return false;
      }

      const startTotalMinutes = startHour * 60 + startMin;
      const endTotalMinutes = endHour * 60 + endMin;

      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be later than start time",
      path: ["endTime"], // this marks the error under endTime field
    }
  );

export const classSchedulesSchema = z
  .array(classScheduleSchema)
  .min(1, "At least one class schedule is required");
