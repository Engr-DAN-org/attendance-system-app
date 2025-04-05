import {
  CourseYearOptionValue,
  courseYearSchema,
} from "@/constants/courseYear";
import { z } from "zod";

interface Course {
  id: number;
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
  description: string;
}

type CourseForm = z.infer<typeof courseSchema>;

export const courseSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  years: courseYearSchema,
  code: z.string().max(6),
  description: z.string().optional(),
});

export type { Course, CreateCourseDTO, CourseForm };
