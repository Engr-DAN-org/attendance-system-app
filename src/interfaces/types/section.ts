import { courseYearSchema } from "@/constants/courseYear";
import { z } from "zod";
import { classSchedulesSchema } from "./classSchedule";
import { courseSchema } from "./course";
import { userSchema } from "./user";

export const sectionSchema = z.object({
  id: z.number().optional(),
  yearLevel: courseYearSchema,
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  courseId: z.string().min(1, "Course is Required"),
  course: courseSchema.optional(),
  teacherId: z.string().optional().nullable(),
  teacher: z
    .lazy(() => userSchema)
    .optional()
    .nullable(), // Use lazy initialization
  students: z.array(z.lazy(() => userSchema)).optional(), // Use lazy initialization
  classSchedules: classSchedulesSchema.optional(),
});

export type Section = z.infer<typeof sectionSchema>;
