import { z } from "zod";

export const DayOfWeekSchema = z.enum(["0", "1", "2", "3", "4", "5", "6"]);

// Define the type for a single day entry
type DayOfWeekEntry = {
  id: string;
  name: string;
  abv: string;
};

// Define the type for the entire DayOfWeekMap
type DayOfWeekMapType = {
  [key: string]: DayOfWeekEntry;
};

// You can create a simpler DayOfWeekMap, only storing the id
export const DayOfWeekMap: DayOfWeekMapType = {
  "0": { id: "0", name: "Sunday", abv: "SUN" },
  "1": { id: "1", name: "Monday", abv: "MON" },
  "2": { id: "2", name: "Tuesday", abv: "TUE" },
  "3": { id: "3", name: "Wednesday", abv: "WED" },
  "4": { id: "4", name: "Thursday", abv: "THU" },
  "5": { id: "5", name: "Friday", abv: "FRI" },
  "6": { id: "6", name: "Saturday", abv: "SAT" },
} as const;

// We only need the id for the ClassSchedule form
export const ClassScheduleFormSchema = z.object({
  // Assume other fields here for the ClassSchedule
  dayOfWeekId: z.number().int().min(0).max(6), // DayOfWeek id (0-6)
  // other validation for class schedule fields...
});

// Generate options for use in forms, just using the day ID and name
export const daysOptions = Object.values(DayOfWeekMap).map((d) => ({
  label: d.name,
  value: d.id,
}));

// Type for DayOfWeek just using the DayOfWeekSchema
export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;

// Type for the ClassSchedule form schema
export type ClassScheduleFormType = z.infer<typeof ClassScheduleFormSchema>;
