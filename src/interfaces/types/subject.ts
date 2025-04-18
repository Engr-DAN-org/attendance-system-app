import { classScheduleSchema } from "@/interfaces/types/classSchedule";
import { z } from "zod";

export type Subject = z.infer<typeof SubjectSchema>;
export type SubjectForm = z.infer<typeof SubjectSchema>;
export type SubjectTeacher = z.infer<typeof subjectTeacherSchema>;

export const subjectTeacherSchema = z.object({
  id: z.number().optional(),
  teacherId: z.string().min(1, "Teacher is Required"),
  teacherName: z.string().optional(),
  subjectId: z.number().optional(),
  subjectName: z.string().optional(),
  subjectCode: z.string().optional(),
});

export const SubjectSchema = z.object({
  id: z.number().optional(),
  code: z.string().min(1, "Required").max(9, "Too long"),
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  classSchedules: z.array(classScheduleSchema).optional(),
  subjectTeachers: z.array(subjectTeacherSchema),
});
