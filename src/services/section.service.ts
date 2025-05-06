// import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { SectionQuery } from "@/interfaces/queryParams/sectionQuery";
import { SectionQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { Section } from "@/interfaces/types/section";
// import { SectionQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import api from "@/lib/axiosSetup";

const createAsync = async (sectionData: Section): Promise<Section> => {
  try {
    const response = await api.post("/section/create", sectionData);
    return response.data;
  } catch (error) {
    console.error("Error creating section:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const updateAsync = async (
  id: number,
  sectionData: Section
): Promise<Section> => {
  try {
    const response = await api.put(`/section/${id}`, sectionData);
    return response.data;
  } catch (error) {
    console.error("Error updating section:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const deleteAsync = async (sectionId: number): Promise<void> => {
  try {
    await api.delete(`/section/${sectionId}`);
  } catch (error) {
    console.error("Error deleting section:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getQueryAsync = async (
  query: SectionQuery
): Promise<SectionQueryResponseDTO> => {
  try {
    const response = await api.get("/section", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (sectionId: number): Promise<Section> => {
  try {
    const response = await api.get(`/section/${sectionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching section by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { createAsync, updateAsync, deleteAsync, getQueryAsync, getByIdAsync };
