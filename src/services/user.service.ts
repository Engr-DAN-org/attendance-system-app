import { UserQuery } from "@/interfaces/queryParams/userQuery";
import { UserQueryResponseDTO } from "@/interfaces/types/queryResponseDTO";
import { User, UserCompleteForm, UserCredForm } from "@/interfaces/types/user";
import api from "@/lib/axiosSetup";

const createAsync = async (userData: UserCompleteForm): Promise<User> => {
  try {
    const response = await api.post("/user/create", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const updateAsync = async (
  id: string,
  userData: UserCompleteForm
): Promise<User> => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const updateUserCredOnlyAsync = async (
  id: string,
  userData: UserCredForm
): Promise<User> => {
  try {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user credentials:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const deleteAsync = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/user/${userId}`);
    return; // No content to return on successful deletion
  } catch (error) {
    console.error("Error deleting user:", error);
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
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const getByIdAsync = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export {
  createAsync,
  updateAsync,
  updateUserCredOnlyAsync,
  deleteAsync,
  getQueryAsync,
  getByIdAsync,
};
