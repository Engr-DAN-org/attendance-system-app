import { courseYearSchema } from "@/constants/courseYear";
import { z } from "zod";
import { classSchedulesSchema } from "./classSchedule";

export const sectionSchema = z.object({
  id: z.number().optional(), // for creation, ID may be omitted
  yearLevel: courseYearSchema,
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),

  courseId: z.number().int(),
  course: z.any().optional(), // optional nested Course object

  teacherId: z.string().optional().nullable(),

  classSchedules: classSchedulesSchema,
});

export type Section = z.infer<typeof sectionSchema>;
