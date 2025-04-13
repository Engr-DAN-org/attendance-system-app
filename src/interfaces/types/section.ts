import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number().optional(), // for creation, ID may be omitted
  yearLevel: z.number().int().min(1, "Year level must be at least 1"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),

  courseId: z.number().int(),
  course: z.any().optional(), // optional nested Course object

  teacherId: z.string().optional().nullable(),

  classSchedules: z.array(z.any()).optional(), // or replace z.any() with a class schedule schema
});
