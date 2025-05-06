import { ClassScheduleQuery } from "@/interfaces/queryParams/classScheduleQuery";
import {
  ClassSchedule,
  ClassScheduleQueryForm,
  ClassSchedules,
} from "@/interfaces/types/classSchedule";
import api from "@/lib/axiosSetup";

const getByTeacherOrSectionAsync = async (
  query: ClassScheduleQuery
): Promise<ClassSchedules> => {
  try {
    console.log("getByTeacherOrSectionAsync params", query);
    if (!query.teacherId && !query.sectionId) {
      console.error("Either teacherId or sectionId must be provided.");
      return Promise.reject("Either teacherId or sectionId must be provided.");
    }

    const response = await api.get("/classSchedule/section-or-teacher", {
      params: query,
    });
    console.log("class ScheduleList", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching class schedules:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const queryAsync = async (
  formData: ClassScheduleQueryForm
): Promise<ClassSchedules> => {
  try {
    const response = await api.get("/classSchedule", {
      params: formData,
    });
    console.log("class ScheduleList", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching class schedules:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (scheduleId: number): Promise<ClassSchedule> => {
  try {
    const response = await api.get(`/classSchedule/${scheduleId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching class schedules by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const createAsync = async (
  classScheduleData: ClassSchedule
): Promise<ClassSchedule> => {
  try {
    const response = await api.post("/classSchedule/create", classScheduleData);
    return response.data;
  } catch (error) {
    console.error("Error creating class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
const updateAsync = async (
  id: number,
  classScheduleData: ClassSchedule
): Promise<ClassSchedule> => {
  try {
    const response = await api.put(`/classSchedule/${id}`, classScheduleData);

    return response.data;
  } catch (error) {
    console.error("Error updating class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
const deleteAsync = async (classScheduleId: number): Promise<void> => {
  try {
    await api.delete(`/classSchedule/${classScheduleId}`);
  } catch (error) {
    console.error("Error deleting class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export {
  createAsync,
  deleteAsync,
  updateAsync,
  getByTeacherOrSectionAsync,
  queryAsync,
  getByIdAsync,
};
