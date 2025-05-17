import {
  ClassSession,
  ClassSessionFormType,
} from "@/interfaces/types/classSession";
import api from "@/lib/axiosSetup";

const getByIdAsync = async (id: string): Promise<ClassSession> => {
  try {
    console.log("getByTeacherOrSectionAsync params", id);

    const response = await api.get(`/classSession/${id}`);
    console.log("classSession Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching class schedules:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// const queryAsync = async (
//   formData: ClassSessionQueryForm
// ): Promise<ClassSessions> => {
//   try {
//     const response = await api.get("/classSession", {
//       params: formData,
//     });
//     console.log("class ScheduleList", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching class schedules:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// const getByIdAsync = async (scheduleId: number): Promise<ClassSession> => {
//   try {
//     const response = await api.get(`/classSession/${scheduleId}`);
//     console.log(response);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching class schedules by ID:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

const startAsync = async (
  classSessionData: ClassSessionFormType
): Promise<ClassSessionFormType> => {
  try {
    const response = await api.post("/classSession/start", classSessionData);
    return response.data;
  } catch (error) {
    console.error("Error creating class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
// const updateAsync = async (
//   id: number,
//   classSessionData: ClassSession
// ): Promise<ClassSession> => {
//   try {
//     const response = await api.put(`/classSession/${id}`, classSessionData);

//     return response.data;
//   } catch (error) {
//     console.error("Error updating class schedule:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

const getListByScheduleIdAsync = async (
  scheduleId: number
): Promise<ClassSession[]> => {
  try {
    const data = await api.get(`/classSession/class-schedule/${scheduleId}`);
    return data.data;
  } catch (error) {
    console.error("Error deleting class schedule:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const endSessionAsync = async (sessionId: string) => {
  try {
    const response = await api.post(`/classSession/end/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error ending class session:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const cancelSessionAsync = async (sessionId: string) => {
  try {
    const response = await api.post(`/classSession/cancel/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling class session:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export {
  startAsync,
  getByIdAsync,
  endSessionAsync,
  cancelSessionAsync,
  getListByScheduleIdAsync,
};
