import AxiosConfig from "../api";

export const addTrainerGoalsApi = async (memberId, goals) => {
  try {
    const response = await AxiosConfig.post(`/trainer/add-goals/`, {
      memberId,
      goals,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default addTrainerGoalsApi;
