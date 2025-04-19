import { SubjectTeacherQuery } from "@/interfaces/queryParams/subjectQuery";
import { SubjectTeachersResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { SubjectTeacher } from "@/interfaces/types/subject";
import api from "@/lib/axiosSetup";

const getSTQueryAsync = async (
  query: SubjectTeacherQuery
): Promise<SubjectTeachersResponseDTO> => {
  try {
    const response = await api.get("/subjectTeacher", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subject teachers:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (subjectId: number): Promise<SubjectTeacher> => {
  try {
    const response = await api.get(`/subjectTeacher/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { getSTQueryAsync, getByIdAsync };
