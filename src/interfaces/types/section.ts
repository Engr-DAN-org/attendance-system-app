import { courseYearSchema } from "@/constants/courseYear";
import { z } from "zod";
import { classSchedulesSchema } from "./classSchedule";
import { courseSchema } from "./course";
import { userSchema } from "./user";

export const sectionSchema = z.object({
  id: z.number().optional(), // for creation, ID may be omitted
  yearLevel: courseYearSchema,
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),

  courseId: z.string().min(1, "Course is Required"), // optional course ID
  course: courseSchema.optional(), // optional nested Course object

  teacherId: z.string().optional().nullable(),
  teacher: userSchema.optional().nullable(),

  students: z.array(userSchema).optional(),

  classSchedules: classSchedulesSchema.optional(),
});

export type Section = z.infer<typeof sectionSchema>;
