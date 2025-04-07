import { CourseQuery } from "@/interfaces/queryParams/courseQuery";
import { Course, CourseForm } from "@/interfaces/types/course";
import { CourseQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import api from "@/lib/axiosSetup";

const createAsync = async (courseData: CourseForm): Promise<Course> => {
  try {
    const response = await api.post("/course/create", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const updateAsync = async (courseData: CourseForm): Promise<Course> => {
  try {
    const response = await api.put("/course/update", courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const deleteAsync = async (courseId: number): Promise<void> => {
  try {
    await api.delete(`/course/${courseId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getQueryAsync = async (
  query: CourseQuery
): Promise<CourseQueryResponseDTO> => {
  try {
    const response = await api.get("/course", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (courseId: string): Promise<Course> => {
  try {
    const response = await api.get(`/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { createAsync, updateAsync, deleteAsync, getQueryAsync, getByIdAsync };
