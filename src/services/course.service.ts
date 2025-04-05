import { Course, CourseForm } from "@/interfaces/types/course";
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

const deleteAsync = async (courseId: string): Promise<void> => {
  try {
    await api.delete(`/course/delete/${courseId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getAllAsync = async (): Promise<Course[]> => {
  try {
    const response = await api.get("/course/all");
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

export { createAsync, updateAsync, deleteAsync, getAllAsync, getByIdAsync };
