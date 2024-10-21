import AxiosConfig from "../api";

export const addTrainerNotesApi = async (memberId, notes) => {
  try {
    const response = await AxiosConfig.post(`/trainer-notes`, {
      memberId,
      notes,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default addTrainerNotesApi;
