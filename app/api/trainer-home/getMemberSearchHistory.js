import AxiosConfig from "../api";

export const getMemberSearchHistory = async () => {
  try {
    const response = await AxiosConfig.get(`/trainer/trainee-search-history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getMemberSearchHistory;
