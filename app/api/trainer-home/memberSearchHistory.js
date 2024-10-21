import AxiosConfig from "../api";

export const memberSearchHistory = async (data) => {
  try {
    const response = await AxiosConfig.post(`/trainer/save-trainee-search`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default memberSearchHistory;
