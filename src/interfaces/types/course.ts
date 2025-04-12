import {
  CourseYearOptionValue,
  courseYearSchema,
} from "@/constants/courseYear";
import { z } from "zod";

interface Course {
  id: number;
  iconId?: number;
  name: string;
  years: CourseYearOptionValue;
  code: string;
  description: string;
  // sections: Section[];
}

interface CreateCourseDTO {
  id?: number;
  name: string;
  years: CourseYearOptionValue;
  code: string;
  iconId: number;
  description: string;
}

type CourseForm = z.infer<typeof courseSchema>;

export const courseSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(10, "Course Name must be at least 10 characters long.")
    .describe("Course Name"),
  years: courseYearSchema,
  code: z
    .string()
    .min(1, "Course Code is required.")
    .max(6, "Course Code must be less than 6 characters.")
    .describe("Course Code"),
  description: z.string().optional().describe("Course Description"),
});

export type { Course, CreateCourseDTO, CourseForm };
