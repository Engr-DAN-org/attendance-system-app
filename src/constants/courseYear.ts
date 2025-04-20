import { z } from "zod";

export const courseYears: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const courseYearLabels: Record<string, string> = {
  "1": "1st Year",
  "2": "2nd Year",
  "3": "3rd Year",
  "4": "4th Year",
  "5": "5th Year",
  "6": "6th Year",
  "7": "7th Year",
  "8": "8th Year",
};

export const courseYearLabel = (year: string): string => {
  return courseYearLabels[year] || "Unknown Year";
};

export interface CourseYearOption {
  value: string;
  label: string;
  grade: string;
}
export type CourseYearOptionValue = CourseYearOption["value"];
export type CourseYearOptionLabel = CourseYearOption["label"];

export interface YearLevelOption {
  value: string;
  label: string;
}
export type YearLevelOptionValue = YearLevelOption["value"];
export type YearLevelOptionLabel = YearLevelOption["label"];

export const courseYearOptions: CourseYearOption[] = [
  { value: "1", label: "1 Year", grade: "1st Year" },
  { value: "2", label: "2 Years", grade: "2nd Year" },
  { value: "3", label: "3 Years", grade: "3rd Year" },
  { value: "4", label: "4 Years", grade: "4th Year" },
  { value: "5", label: "5 Years", grade: "5th Year" },
  { value: "6", label: "6 Years", grade: "6th Year" },
  { value: "7", label: "7 Years", grade: "7th Year" },
  { value: "8", label: "8 Years", grade: "8th Year" },
] as const;

export const yearLevelOptions: YearLevelOption[] = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
  { value: "6", label: "6th Year" },
  { value: "7", label: "7th Year" },
  { value: "8", label: "8th Year" },
] as const;

export const yearLevelSchema = z
  .string()
  .refine((year) => yearLevelOptions.some((option) => option.value == year), {
    message: "Invalid year level",
  });

export const courseYearSchema = z
  .string()
  .refine((year) => courseYears.includes(year), {
    message: "Invalid course year",
  })
  .describe("Course Years");
// Zod schema for an array of CourseYearOption
export const courseYearArraySchema = z.array(courseYearSchema);

// Example to retrieve type from schema.
export type ValidatedCourseYear = z.infer<typeof courseYearSchema>;
export type ValidatedCourseYearArray = z.infer<typeof courseYearArraySchema>;
