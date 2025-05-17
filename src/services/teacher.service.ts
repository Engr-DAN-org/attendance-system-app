import { OverrideAttendanceRecord } from "@/interfaces/types/attendanceRecord";
import { ClassSchedule } from "@/interfaces/types/classSchedule";
import api from "@/lib/axiosSetup";

export const getClassSchedulesAsync = async (): Promise<ClassSchedule[]> => {
  try {
    const response = await api.get(`/teacher/class-schedules`);

    return response.data;
  } catch (error) {
    console.error("Error fetching class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getClassScheduleByIdAsync = async (
  scheduleId: number
): Promise<ClassSchedule> => {
  try {
    const response = await api.get(`/teacher/class-schedules/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class schedule by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const overrideAttendanceRecordAsync = async (
  data: OverrideAttendanceRecord
) => {
  try {
    const response = await api.post(`/teacher/override-attendance`, data);
    return response.data;
  } catch (error) {
    console.error("Error overriding attendance record:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
