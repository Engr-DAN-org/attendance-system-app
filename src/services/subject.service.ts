import {
  SubjectQuery,
  SubjectTeacherQuery,
} from "@/interfaces/queryParams/subjectQuery";
import {
  SubjectQueryResponseDTO,
  SubjectTeachersResponseDTO,
} from "@/interfaces/types/queryResponseDTO";
import { Subject, SubjectForm } from "@/interfaces/types/subject";
import api from "@/lib/axiosSetup";

const createAsync = async (createData: SubjectForm): Promise<Subject> => {
  try {
    console.log("Creating subject with data:", createData);
    const response = await api.post("/subject/create", createData);
    return response.data;
  } catch (error) {
    console.error("Error creating subject:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const updateAsync = async (
  id: number,
  formData: SubjectForm
): Promise<Subject> => {
  try {
    console.log("Updating subject with ID:", id, "and data:", formData);

    const response = await api.put(`/subject/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating subject:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const deleteAsync = async (subjectId: number): Promise<void> => {
  try {
    await api.delete(`/subject/${subjectId}`);
  } catch (error) {
    console.error("Error deleting subject:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getQueryAsync = async (
  query: SubjectQuery
): Promise<SubjectQueryResponseDTO> => {
  try {
    const response = await api.get("/subject", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const querySubjectTeachersAsync = async (
  query: SubjectTeacherQuery
): Promise<SubjectTeachersResponseDTO> => {
  try {
    const response = await api.get("/subject/teachers", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher subjects:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (subjectId: string): Promise<Subject> => {
  try {
    const response = await api.get(`/subject/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subject by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export {
  createAsync,
  updateAsync,
  deleteAsync,
  getQueryAsync,
  querySubjectTeachersAsync,
  getByIdAsync,
};
