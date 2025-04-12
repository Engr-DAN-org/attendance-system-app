import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { Course, CourseForm } from "@/interfaces/types/course";
import { UserQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
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
    const response = await api.put("/user/update", courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const deleteAsync = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/user/${userId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getQueryAsync = async (
  query: UserQuery
): Promise<UserQueryResponseDTO> => {
  try {
    const response = await api.get("/user", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (userId: string): Promise<Course> => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { createAsync, updateAsync, deleteAsync, getQueryAsync, getByIdAsync };
