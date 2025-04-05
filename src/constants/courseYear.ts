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

export const courseYearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
  { value: "6", label: "6th Year" },
  { value: "7", label: "7th Year" },
  { value: "8", label: "8th Year" },
] as const;

export type CourseYearOption = (typeof courseYearOptions)[number];
export type CourseYearOptionValue = CourseYearOption["value"];
export type CourseYearOptionLabel = CourseYearOption["label"];

export const courseYearSchema = z
  .string()
  .refine((year) => courseYears.includes(year), {
    message: "Invalid course year",
  });
// Zod schema for an array of CourseYearOption
export const courseYearArraySchema = z.array(courseYearSchema);

// Example to retrieve type from schema.
export type ValidatedCourseYear = z.infer<typeof courseYearSchema>;
export type ValidatedCourseYearArray = z.infer<typeof courseYearArraySchema>;
