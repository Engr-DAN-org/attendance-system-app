import { ClassSchedule } from "@/interfaces/types/classSchedule";
import api from "@/lib/axiosSetup";

type TeacherClassScheduleType = (teacherId: string) => Promise<ClassSchedule[]>;

export const getClassSchedulesAsync: TeacherClassScheduleType = async (
  teacherId
) => {
  try {
    const response = await api.get(`/teacher/class-schedule/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
