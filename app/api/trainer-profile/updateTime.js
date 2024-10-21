import AxiosConfig from "../api";

export const updateTimeApi = async (availableSessionTime) => {
  try {
    const response = await AxiosConfig.post(`/trainer/intro`, {
      availableSessionTime,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateTimeApi;
